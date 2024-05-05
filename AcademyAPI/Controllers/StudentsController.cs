using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AcademyAPI.Models;
using AcademyAPI.Models.Classes;
using Microsoft.Data.SqlClient;
using AcademyAPI.StoredProcedures;
using Microsoft.AspNetCore.Authorization;

namespace AcademyAPI.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]

    public class StudentsController : Controller
    {
        private readonly AcademyDbContext _context;
        
        public StudentsController(AcademyDbContext context)
        {
            _context = context;
        }

        /*STUDENTS INFO*/


        [HttpGet("getstudent")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<IEnumerable<StudentInfo>>> GetStudents()
        {
            return await _context.studinfo.ToListAsync();
        }

        [HttpGet("getstudentclass")]
        [AllowAnonymous]
        public async Task<ActionResult<IEnumerable<StudentClass>>> GetStudentClass()
        {
            return await _context.studclass.ToListAsync();
        }

        [HttpGet("getstudentscount")]
        public async Task<object> GetStdCount()
        {
            var query = (from t in _context.studinfo
                         group t by new { t.RegDate.Date.Year, t.RegDate.Date.Month }
             into grp
                         select new
                         {
                             grp.Key.Year,
                             grp.Key.Month,
                             StudentCount = grp.Count()
                         }).ToListAsync();
           /* var count = await _context.studinfo.GroupBy(x => new { x.RegDate.Date.Year, x.RegDate.Date.Month }).ToListAsync();*/
            return await query;
            
        }

        [HttpGet("getstudentscounteachprog")]
        public async Task<object> GetStdCountEachProg()
        {
            var query = (from sc in _context.studclass
                         join p in _context.programs on sc.ProgramId equals p.ProgramId
                         group sc by new { p.ProgramName}
             into grp
                         select new
                         {
                             grp.Key.ProgramName,
                             StudentCount = grp.Count()
                         }).ToListAsync();
            /* var count = await _context.studinfo.GroupBy(x => new { x.RegDate.Date.Year, x.RegDate.Date.Month }).ToListAsync();*/
            return await query;

        }

        [HttpPost("addstudent")]
        public async Task<ActionResult<StudentInfo>> PostStudent(StudentInfo stud)
        {
            _context.studinfo.Add(stud);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetStudents", new { id = stud.StudentId }, stud);
        }

        /*[HttpPost("addstudentclass")]
        public async Task<ActionResult<StudentClass>> PostStudentClass(StudentClass studcls)
        {
            _context.studclass.Add(studcls);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetStudentClass", new { id = studcls.StudentClId }, studcls);
        }*/

        [HttpPost("addstudentclass")]
        public async Task<ActionResult<StudentClass>> PostStudentClass(StudentClass studcls)
        {
            try
            {
                var capacityChecker = new ProgramCapacityCheckAndAdd(_context);

                // Check program capacity
                bool isCapacityFull = await capacityChecker.CheckProgramCapacityAndAdd(studcls.ProgramId, studcls.StudentId);

                if (!isCapacityFull)
                {
                    return CreatedAtAction("GetStudentClass", new { id = studcls.StudentClId }, studcls);
                }
                else
                {
                    // Program is at full capacity
                    return BadRequest("Cannot register student. Program is at full capacity.");
                }
            }
            catch (Exception ex)
            {
                throw;
/*                return StatusCode(500, $"An error occurred: {ex.Message}");*/
            }
        }

        [HttpDelete("deletestudent/{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<IEnumerable<StudentInfo>>> DeleteStudent(int id)
        {
            var studDel = await _context.studinfo.FindAsync(id);
            if (studDel == null) return NotFound();

            _context.studinfo.Remove(studDel);
            await _context.SaveChangesAsync();
            return NoContent();

        }

        [HttpPut("updatestudent/{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> InstructorUpdate(int id, StudentInfo stud)
        {
            if (id != stud.StudentId) return BadRequest();

            _context.Entry(stud).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpPut("updatestudentclass/{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> InstructorUpdate(int id, StudentClass studcls)
        {
            if (id != studcls.StudentClId) return BadRequest();

            _context.Entry(studcls).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
