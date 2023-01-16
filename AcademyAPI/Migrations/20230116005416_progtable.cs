using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AcademyAPI.Migrations
{
    /// <inheritdoc />
    public partial class progtable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "InstructorName",
                table: "programs");

            migrationBuilder.AddColumn<int>(
                name: "InstId",
                table: "programs",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "InstId",
                table: "programs");

            migrationBuilder.AddColumn<string>(
                name: "InstructorName",
                table: "programs",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }
    }
}
