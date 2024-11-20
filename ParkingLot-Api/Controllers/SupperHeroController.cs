using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ParkingLot_Api.Data;
using ParkingLot_Api.Entities;

namespace ParkingLot_Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SupperHeroController : ControllerBase
    {
        private readonly DataContext _context;
        public SupperHeroController(DataContext context)
        {
            _context = context;
        }
        [HttpGet]
        public async Task<ActionResult<List<SupperHero>>> GetAll()
        {
            var heroes = await _context.SupperHeroDEMO.ToListAsync();
            return Ok(heroes);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<List<SupperHero>>> GetById(int id)
        {
            var heroes = await _context.SupperHeroDEMO.FindAsync(id);
            if (heroes is null)
            {
                return BadRequest("Value Null");
            }
            return Ok(heroes);
        }

        [HttpPost]
        public async Task<ActionResult<List<SupperHero>>> Insert(SupperHero hero)
        {
            _context.SupperHeroDEMO.Add(hero);
            await _context.SaveChangesAsync();
            return Ok(await _context.SupperHeroDEMO.ToListAsync());
        }

        [HttpPut]
        public async Task<ActionResult<List<SupperHero>>> Update(SupperHero request)
        {
            var heroes = await _context.SupperHeroDEMO.FindAsync(request.Id);
            if (heroes is null)
            {
                return BadRequest("Value Null");
            }
            heroes.Name = request.Name;
            heroes.Power = request.Power;
            heroes.City = request.City;
            await _context.SaveChangesAsync();
            return Ok(await _context.SupperHeroDEMO.ToListAsync());
        }

        [HttpDelete]
        public async Task<ActionResult<List<SupperHero>>> Delete(int id)
        {
            var heroes = await _context.SupperHeroDEMO.FindAsync(id);
            if (heroes is null)
            {
                return BadRequest("Value Null");
            }
            _context.SupperHeroDEMO.Remove(heroes);
            await _context.SaveChangesAsync();
            return Ok(await _context.SupperHeroDEMO.ToListAsync());
        }
    }
}
