using AcademyAPI.Models;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;

namespace AcademyAPI.StoredProcedures
{
    public class ProgramCapacityCheckAndAdd
    {
        private readonly AcademyDbContext _context;

        public ProgramCapacityCheckAndAdd(AcademyDbContext context)
        {
            _context = context;
        }

        public async Task<bool> CheckProgramCapacityAndAdd(int programId, int studentId)
        {
            // Define parameters for stored procedure
            SqlParameter programIdParam = new SqlParameter("@ProgramId", programId);
            SqlParameter studentIdParam = new SqlParameter("@StudentId", studentId);
            SqlParameter isCapacityFullParam = new SqlParameter
            {
                ParameterName = "@IsCapacityFull",
                SqlDbType = System.Data.SqlDbType.Bit,
                Direction = System.Data.ParameterDirection.Output
            };

            // Call the stored procedure
            await _context.Database.ExecuteSqlRawAsync(
                "EXEC CheckProgramCapacity @ProgramId, @StudentId, @IsCapacityFull OUTPUT",
                programIdParam, studentIdParam, isCapacityFullParam);

            // Retrieve the output parameter value
            bool isCapacityFull = Convert.ToBoolean(isCapacityFullParam.Value);

            return isCapacityFull;
        }
    }

}
