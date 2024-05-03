using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AcademyAPI.Models;
using AcademyAPI.Models.Classes;

namespace AcademyAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InstructorController : Controller
    {
        private readonly AcademyDbContext _context;
        public InstructorController(AcademyDbContext context)
        {
            _context = context;
        }


        /*INSTRUCTOR INFO*/

        [HttpGet("getinst")]
        public async Task<ActionResult<IEnumerable<InstructorInfo>>> GetInstAll()
        {
            return await _context.instinfo.ToListAsync();
        }

        [HttpGet("getinstwithstylenames")]
        public async Task<object> GetInstAllWithStyleNames()
        {
            var query = (from i in _context.instinfo
                         join s in _context.styleinfo on i.StyleId equals s.StyleId
                         select new
                         { i.InstFullName, i.InstType, i.InstContractFrom,i.InstContractTo, i.Status , s.StyleName}).ToListAsync();
            /* var count = await _context.studinfo.GroupBy(x => new { x.RegDate.Date.Year, x.RegDate.Date.Month }).ToListAsync();*/
            return await query;
        }


        [HttpGet("getpermanentinst")]
        public async Task<ActionResult<IEnumerable<InstructorInfo>>> GetPermanentInst()
        {
            return await _context.instinfo.Where(x => x.InstType=="Permanent" && x.Status == "Active").ToListAsync();
        }

        [HttpGet("getfreelanceinst")]
        public async Task<ActionResult<IEnumerable<InstructorInfo>>> GetFreelanceInst()
        {
            return await _context.instinfo.Where(x => x.InstType == "Freelance" && x.Status=="Active").ToListAsync();
        }

        [HttpGet("getperminstcount")]
        public async Task<object> GetPermInstCount()
        {
            return await _context.instinfo.Where(x => x.InstType == "Permanent" && x.Status == "Active").CountAsync();
        }

        [HttpGet("getfreelanceinstcount")]
        public async Task<object> GetFreeInstCount()
        {
            return await _context.instinfo.Where(x => x.InstType == "Freelance" &&  x.Status == "Active").CountAsync();
        }

        [HttpPost("addinst")]
        public async Task<ActionResult<InstructorInfo>> PostInstructor(InstructorInfo inst)
        {
            _context.instinfo.Add(inst);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetInstAll", new { name = inst.InstId }, inst);
        }

        [HttpDelete("deleteinst/{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<IEnumerable<InstructorInfo>>> DeleteInstructor(int id)
        {
            var instDel = await _context.instinfo.FindAsync(id);
            if (instDel == null) return NotFound();

            _context.instinfo.Remove(instDel);
            await _context.SaveChangesAsync();
            return NoContent();

        }

        [HttpPut("updateinst/{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> InstructorUpdate(int id, InstructorInfo inst)
        {
            if (id != inst.InstId) return BadRequest();

            _context.Entry(inst).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent();
        }

    }
}
