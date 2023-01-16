using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AcademyAPI.Migrations
{
    /// <inheritdoc />
    public partial class staffinsttable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Status",
                table: "studinfo",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Status",
                table: "studinfo");
        }
    }
}
