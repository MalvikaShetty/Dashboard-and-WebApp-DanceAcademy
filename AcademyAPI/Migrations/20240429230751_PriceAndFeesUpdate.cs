using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AcademyAPI.Migrations
{
    /// <inheritdoc />
    public partial class PriceAndFeesUpdate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "FeesPaid",
                table: "studclass",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "PricePerPerson",
                table: "programs",
                type: "int",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "FeesPaid",
                table: "studclass");

            migrationBuilder.DropColumn(
                name: "PricePerPerson",
                table: "programs");
        }
    }
}
