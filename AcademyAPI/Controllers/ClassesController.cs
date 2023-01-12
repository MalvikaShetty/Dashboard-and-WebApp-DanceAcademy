using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AcademyAPI.Models;
using AcademyAPI.Models.Classes;

namespace AcademyAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClassesController : Controller
    {
        private readonly AcademyDbContext _context;
        public ClassesController(AcademyDbContext context)
        {
            _context = context;
        }


        /*PROGRAMS*/

        [HttpGet("getprogram")]
        public async Task<ActionResult<IEnumerable<Programs>>> GetPrograms()
        {
            return await _context.programs.ToListAsync();
        }


        [HttpGet("getprogram/{id}")]
        public async Task<ActionResult<IEnumerable<Programs>>> GetProgramsByName(int id)
        {
            return await _context.programs.Where(t => t.StyleId == id).ToListAsync();
        }



        [HttpPost("addprogram")]
        public async Task<ActionResult<Programs>> PostPrograms(Programs prog)
        {
            _context.programs.Add(prog);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPrograms", new { name = prog.ProgramName }, prog);
        }

    /*    [HttpDelete("deleteproj/{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<IEnumerable<Projects>>> DeleteProject(int id)
        {
            var projDel = await _context.projects.FindAsync(id);
            if (projDel == null) return NotFound();

            _context.projects.Remove(projDel);
            await _context.SaveChangesAsync();
            return NoContent();

        }

        [HttpPut("updateproj/{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> ProjectUpdate(int id, Projects proj)
        {
            if (id != proj.ProjId) return BadRequest();

            _context.Entry(proj).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent();
        }*/

        /*STYLE INFO*/

        [HttpGet("getstyle")]
        public async Task<ActionResult<IEnumerable<StyleInfo>>> GetStyleInfo()
        {
            return await _context.styleinfo.ToListAsync();
        }

        [HttpPost("addstyle")]
        public async Task<ActionResult<StyleInfo>> PostStyle(StyleInfo style)
        {
            _context.styleinfo.Add(style);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetStyleInfo", new { id = style.StyleId }, style);
        }

        /*PROGRAM DAYS*/

        [HttpGet("getprogday")]
        public async Task<ActionResult<IEnumerable<ProgramDays>>> GetProgramDays()
        {
            return await _context.progdays.ToListAsync();
        }

        //get specific programs based on programName
        [HttpGet("getprogday/{name}")]
        public async Task<ActionResult<IEnumerable<ProgramDays>>> GetProgramDaysByName(string name)
        {
            return await _context.progdays.Where(t => t.ProgramName == name).ToListAsync();
        }


        [HttpPost("addprogdaay")]
        public async Task<ActionResult<ProgramDays>> PostProgramDays(ProgramDays progdays)
        {
            _context.progdays.Add(progdays);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetProgramDays", new { id = progdays.PDId }, progdays);
        }
    }
}
