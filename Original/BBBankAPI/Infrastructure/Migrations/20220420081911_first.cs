using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    public partial class first : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    FirstName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    LastName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ProfilePicUrl = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Accounts",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    AccountNumber = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    AccountTitle = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CurrentBalance = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    AccountStatus = table.Column<int>(type: "int", nullable: false),
                    UserId = table.Column<string>(type: "nvarchar(450)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Accounts", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Accounts_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Transactions",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    TransactionType = table.Column<int>(type: "int", nullable: false),
                    TransactionDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    TransactionAmount = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    AccountId = table.Column<string>(type: "nvarchar(450)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Transactions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Transactions_Accounts_AccountId",
                        column: x => x.AccountId,
                        principalTable: "Accounts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "Email", "FirstName", "LastName", "ProfilePicUrl" },
                values: new object[] { "aa45e3c9-261d-41fe-a1b0-5b4dcf79cfd3", "rassmasood@hotmail.com", "Raas", "Masood", "https://res.cloudinary.com/demo/image/upload/w_400,h_400,c_crop,g_face,r_max/w_200/lady.jpg" });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "Email", "FirstName", "LastName", "ProfilePicUrl" },
                values: new object[] { "c651e237-102a-4de1-8c5a-d41c94079ff0", "salman-dev@outlook.com", "Salman", "Taj", "https://res.cloudinary.com/demo/image/upload/w_400,h_400,c_crop,g_face,r_max/w_200/lady.jpg" });

            migrationBuilder.InsertData(
                table: "Accounts",
                columns: new[] { "Id", "AccountNumber", "AccountStatus", "AccountTitle", "CurrentBalance", "UserId" },
                values: new object[] { "2f115781-c0d2-4f98-a70b-0bc4ed01d780", "0002-2002", 0, "Salman Taj", 545m, "c651e237-102a-4de1-8c5a-d41c94079ff0" });

            migrationBuilder.InsertData(
                table: "Accounts",
                columns: new[] { "Id", "AccountNumber", "AccountStatus", "AccountTitle", "CurrentBalance", "UserId" },
                values: new object[] { "37846734-172e-4149-8cec-6f43d1eb3f60", "0001-1001", 0, "Raas Masood", 3500m, "aa45e3c9-261d-41fe-a1b0-5b4dcf79cfd3" });

            migrationBuilder.InsertData(
                table: "Transactions",
                columns: new[] { "Id", "AccountId", "TransactionAmount", "TransactionDate", "TransactionType" },
                values: new object[,]
                {
                    { "071e0359-3b44-4373-88c6-b3d7efce7770", "37846734-172e-4149-8cec-6f43d1eb3f60", 200m, new DateTime(2021, 7, 20, 3, 19, 10, 938, DateTimeKind.Local).AddTicks(6562), 0 },
                    { "074b06bb-c104-4cac-85df-50ff7eda194e", "37846734-172e-4149-8cec-6f43d1eb3f60", 3000m, new DateTime(2022, 4, 19, 3, 19, 10, 938, DateTimeKind.Local).AddTicks(6497), 0 },
                    { "197771df-832c-440f-b856-1e71bc3214e5", "37846734-172e-4149-8cec-6f43d1eb3f60", -200m, new DateTime(2021, 12, 20, 3, 19, 10, 938, DateTimeKind.Local).AddTicks(6541), 1 },
                    { "5ade4fce-03ee-4537-81e8-711922a5b81a", "37846734-172e-4149-8cec-6f43d1eb3f60", -500m, new DateTime(2021, 6, 20, 3, 19, 10, 938, DateTimeKind.Local).AddTicks(6565), 1 },
                    { "6cc88a85-5862-4a82-80e2-da16171c3959", "37846734-172e-4149-8cec-6f43d1eb3f60", -100m, new DateTime(2021, 8, 20, 3, 19, 10, 938, DateTimeKind.Local).AddTicks(6559), 1 },
                    { "7f2c62d4-1147-44a3-85c5-60ded176398b", "37846734-172e-4149-8cec-6f43d1eb3f60", -500m, new DateTime(2021, 4, 20, 3, 19, 10, 938, DateTimeKind.Local).AddTicks(6531), 1 },
                    { "9ce2398f-15ed-4b56-8ca9-25a1f444554e", "37846734-172e-4149-8cec-6f43d1eb3f60", 500m, new DateTime(2021, 11, 20, 3, 19, 10, 938, DateTimeKind.Local).AddTicks(6544), 0 },
                    { "a6e67113-d9a2-4195-a5f5-81d6ebe9be60", "37846734-172e-4149-8cec-6f43d1eb3f60", 900m, new DateTime(2021, 5, 20, 3, 19, 10, 938, DateTimeKind.Local).AddTicks(6568), 0 },
                    { "b1fed266-dc74-40d2-b690-e77d972423b3", "37846734-172e-4149-8cec-6f43d1eb3f60", 500m, new DateTime(2022, 1, 20, 3, 19, 10, 938, DateTimeKind.Local).AddTicks(6538), 0 },
                    { "ba598206-f14b-4617-a3dc-67fbd1748b30", "37846734-172e-4149-8cec-6f43d1eb3f60", 200m, new DateTime(2021, 10, 20, 3, 19, 10, 938, DateTimeKind.Local).AddTicks(6547), 0 },
                    { "d56ff06c-79e7-43d9-8eab-147d635e0a2d", "37846734-172e-4149-8cec-6f43d1eb3f60", 1000m, new DateTime(2020, 4, 20, 3, 19, 10, 938, DateTimeKind.Local).AddTicks(6534), 0 },
                    { "ee215332-0992-4cea-88f8-abbe03d0b54e", "37846734-172e-4149-8cec-6f43d1eb3f60", -300m, new DateTime(2021, 9, 20, 3, 19, 10, 938, DateTimeKind.Local).AddTicks(6550), 1 }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Accounts_UserId",
                table: "Accounts",
                column: "UserId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Transactions_AccountId",
                table: "Transactions",
                column: "AccountId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Transactions");

            migrationBuilder.DropTable(
                name: "Accounts");

            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
