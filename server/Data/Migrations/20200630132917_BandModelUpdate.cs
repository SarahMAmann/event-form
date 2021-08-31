using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Data.Migrations
{
    public partial class BandModelUpdate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Bands",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Bands",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Bands",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Bands",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "Bands",
                keyColumn: "Id",
                keyValue: 5);

            migrationBuilder.DeleteData(
                table: "Bands",
                keyColumn: "Id",
                keyValue: 6);

            migrationBuilder.DeleteData(
                table: "Bands",
                keyColumn: "Id",
                keyValue: 7);

            migrationBuilder.DeleteData(
                table: "Bands",
                keyColumn: "Id",
                keyValue: 8);

            migrationBuilder.DeleteData(
                table: "Bands",
                keyColumn: "Id",
                keyValue: 9);

            migrationBuilder.DeleteData(
                table: "Bands",
                keyColumn: "Id",
                keyValue: 10);

            migrationBuilder.DeleteData(
                table: "Bands",
                keyColumn: "Id",
                keyValue: 11);

            migrationBuilder.DeleteData(
                table: "Bands",
                keyColumn: "Id",
                keyValue: 12);

            migrationBuilder.DeleteData(
                table: "Bands",
                keyColumn: "Id",
                keyValue: 13);

            migrationBuilder.DeleteData(
                table: "Bands",
                keyColumn: "Id",
                keyValue: 14);

            migrationBuilder.DeleteData(
                table: "Bands",
                keyColumn: "Id",
                keyValue: 15);

            migrationBuilder.DeleteData(
                table: "Bands",
                keyColumn: "Id",
                keyValue: 16);

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "Bands",
                type: "varchar(255)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "varchar(100)",
                oldNullable: true);

            migrationBuilder.AlterColumn<Guid>(
                name: "Id",
                table: "Bands",
                nullable: false,
                oldClrType: typeof(int))
                .OldAnnotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn);

            migrationBuilder.InsertData(
                table: "Bands",
                columns: new[] { "Id", "Name" },
                values: new object[,]
                {
                    { new Guid("5bb5cddc-2d6c-461e-9c99-4d0432b2c5f0"), "AC/DC" },
                    { new Guid("688819af-2922-483e-bded-af4b7920c63b"), "The Allman Brothers Band" },
                    { new Guid("5a77e5cb-6872-4496-9622-9d2cf76a2250"), "Blondie" },
                    { new Guid("172715c6-84a4-483f-a74e-91e0c00ff58e"), "The Grateful Dead" },
                    { new Guid("f8e06718-060d-4805-aaf7-699acd1f07ac"), "Joy Division" },
                    { new Guid("60e53e12-6ebd-4467-b4c2-50c46478b597"), "Led Zepplin" },
                    { new Guid("f6dc5eee-b72d-4732-9e22-112cba681dde"), "Pavement" },
                    { new Guid("494f5584-71a5-4876-bd00-8c77c79dc5d2"), "Pink Floyd" },
                    { new Guid("00a48593-cd7e-4023-a4b8-ee09731d3efa"), "The Police" },
                    { new Guid("a8d71777-4a41-4ae4-a948-4e7a415ad83e"), "The Rolling Stones" },
                    { new Guid("026ffb48-0b13-4053-b30d-1b3a312b121f"), "Sonic Youth" },
                    { new Guid("cc90b00b-8ed8-4fc7-9bfb-2a767da2b86e"), "Talking Heads" },
                    { new Guid("06f1338a-1945-47e4-897c-29263aaa824a"), "The Velvet Underground" },
                    { new Guid("b95ae9c0-918e-4940-b37d-d060b36a95b1"), "The Beatles" },
                    { new Guid("0de9d5c7-0847-4dfe-9dd6-c34bb4bf60cc"), "The Cars" },
                    { new Guid("014fb3fe-d9f9-4cd8-8028-88ddca13a634"), "Janis Joplin" }
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Bands",
                keyColumn: "Id",
                keyValue: new Guid("00a48593-cd7e-4023-a4b8-ee09731d3efa"));

            migrationBuilder.DeleteData(
                table: "Bands",
                keyColumn: "Id",
                keyValue: new Guid("014fb3fe-d9f9-4cd8-8028-88ddca13a634"));

            migrationBuilder.DeleteData(
                table: "Bands",
                keyColumn: "Id",
                keyValue: new Guid("026ffb48-0b13-4053-b30d-1b3a312b121f"));

            migrationBuilder.DeleteData(
                table: "Bands",
                keyColumn: "Id",
                keyValue: new Guid("06f1338a-1945-47e4-897c-29263aaa824a"));

            migrationBuilder.DeleteData(
                table: "Bands",
                keyColumn: "Id",
                keyValue: new Guid("0de9d5c7-0847-4dfe-9dd6-c34bb4bf60cc"));

            migrationBuilder.DeleteData(
                table: "Bands",
                keyColumn: "Id",
                keyValue: new Guid("172715c6-84a4-483f-a74e-91e0c00ff58e"));

            migrationBuilder.DeleteData(
                table: "Bands",
                keyColumn: "Id",
                keyValue: new Guid("494f5584-71a5-4876-bd00-8c77c79dc5d2"));

            migrationBuilder.DeleteData(
                table: "Bands",
                keyColumn: "Id",
                keyValue: new Guid("5a77e5cb-6872-4496-9622-9d2cf76a2250"));

            migrationBuilder.DeleteData(
                table: "Bands",
                keyColumn: "Id",
                keyValue: new Guid("5bb5cddc-2d6c-461e-9c99-4d0432b2c5f0"));

            migrationBuilder.DeleteData(
                table: "Bands",
                keyColumn: "Id",
                keyValue: new Guid("60e53e12-6ebd-4467-b4c2-50c46478b597"));

            migrationBuilder.DeleteData(
                table: "Bands",
                keyColumn: "Id",
                keyValue: new Guid("688819af-2922-483e-bded-af4b7920c63b"));

            migrationBuilder.DeleteData(
                table: "Bands",
                keyColumn: "Id",
                keyValue: new Guid("a8d71777-4a41-4ae4-a948-4e7a415ad83e"));

            migrationBuilder.DeleteData(
                table: "Bands",
                keyColumn: "Id",
                keyValue: new Guid("b95ae9c0-918e-4940-b37d-d060b36a95b1"));

            migrationBuilder.DeleteData(
                table: "Bands",
                keyColumn: "Id",
                keyValue: new Guid("cc90b00b-8ed8-4fc7-9bfb-2a767da2b86e"));

            migrationBuilder.DeleteData(
                table: "Bands",
                keyColumn: "Id",
                keyValue: new Guid("f6dc5eee-b72d-4732-9e22-112cba681dde"));

            migrationBuilder.DeleteData(
                table: "Bands",
                keyColumn: "Id",
                keyValue: new Guid("f8e06718-060d-4805-aaf7-699acd1f07ac"));

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "Bands",
                type: "varchar(100)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "varchar(255)",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "Id",
                table: "Bands",
                nullable: false,
                oldClrType: typeof(Guid))
                .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn);

            migrationBuilder.InsertData(
                table: "Bands",
                columns: new[] { "Id", "Name" },
                values: new object[,]
                {
                    { 1, "AC/DC" },
                    { 2, "The Allman Brothers Band" },
                    { 3, "Blondie" },
                    { 4, "The Grateful Dead" },
                    { 5, "Joy Division" },
                    { 6, "Led Zepplin" },
                    { 7, "Pavement" },
                    { 8, "Pink Floyd" },
                    { 9, "The Police" },
                    { 10, "The Rolling Stones" },
                    { 11, "Sonic Youth" },
                    { 12, "Talking Heads" },
                    { 13, "The Velvet Underground" },
                    { 14, "The Beatles" },
                    { 15, "The Cars" },
                    { 16, "Janis Joplin" }
                });
        }
    }
}
