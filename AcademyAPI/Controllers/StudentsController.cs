﻿using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AcademyAPI.Models;
using AcademyAPI.Models.Classes;

namespace AcademyAPI.Controllers
{
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
        public async Task<ActionResult<IEnumerable<StudentInfo>>> GetStudents()
        {
            return await _context.studinfo.ToListAsync();
        }

        [HttpGet("getstudentclass")]
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

        [HttpPost("addstudentclass")]
        public async Task<ActionResult<StudentClass>> PostStudentClass(StudentClass studcls)
        {
            _context.studclass.Add(studcls);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetStudentClass", new { id = studcls.StudentClId }, studcls);
        }
    }
}