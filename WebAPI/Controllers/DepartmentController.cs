using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using System.Data.SqlClient;
using System.Data;
using WebAPI.Models;
using System.Data.SqlTypes;
namespace WebAPI.Controllers
        //Controller for Department Object -- CRUD Operations Of Department Table
{
    [Route("api/[controller]")]
    [ApiController]
    public class DepartmentController : ControllerBase
    {
        SqlCommand cmd = new SqlCommand();
        private readonly IConfiguration _configuration;
        public DepartmentController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]
        public JsonResult GetAllDepartments()
        {
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.CommandText = "sp_GetAllDepartments";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("SchoolAppCon");
            SqlDataReader myReader;
            try
            {
                using (SqlConnection myCon = new SqlConnection(sqlDataSource))
                {
                    myCon.Open();
                    cmd.Connection = myCon;
                    using (cmd)
                    {
                        myReader = cmd.ExecuteReader();
                        table.Load(myReader); ;

                        myReader.Close();
                        myCon.Close();
                    }
                }
                return new JsonResult(table);
            }
            catch (Exception e)
            {
                Console.Write(e.Message);
                return new JsonResult("Error getting Department Info");

            }
        }
        [HttpGet]
        [Route("List")]
        public JsonResult GetAllDepartmentList()
        {
            cmd.CommandType = CommandType.Text;
            cmd.CommandText = "SELECT DepartmentDescription FROM Departments";
            List<string> codes = new List<string>();
            string sqlDataSource = _configuration.GetConnectionString("SchoolAppCon");
            SqlDataReader myReader;
            try
            {
                using (SqlConnection myCon = new SqlConnection(sqlDataSource))
                {
                    myCon.Open();
                    cmd.Connection = myCon;
                    using (cmd)
                    {
                        myReader = cmd.ExecuteReader();
                        while (myReader.Read())
                        {
                            codes.Add(myReader.GetString(0));
                        }

                        myReader.Close();
                        myCon.Close();
                    }
                }

                return new JsonResult(codes);
            }
            catch (Exception e)
            {
                Console.Write(e.Message);
                return new JsonResult("Error getting Department Info");

            }
        }
        [HttpGet("{id}")]
        public JsonResult GetDepartmentById(int id)
        {
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.CommandTimeout = 30;
            cmd.CommandText = "sp_GetAllDepartmentsById";
            cmd.Parameters.Clear();
            SqlParameter paramId = new SqlParameter();
            paramId = new SqlParameter("@id", id);
            cmd.Parameters.Add(paramId);
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("SchoolAppCon");
            SqlDataReader myReader;
            try
            {
                using (SqlConnection myCon = new SqlConnection(sqlDataSource))
                {
                    myCon.Open();
                    cmd.Connection = myCon;
                    using (cmd)
                    {
                        myReader = cmd.ExecuteReader();
                        table.Load(myReader); ;

                        myReader.Close();
                        myCon.Close();
                    }
                }

                return new JsonResult(table);
            }
            catch (Exception e)
            {
                Console.Write(e.Message);
                return new JsonResult("Error getting Department Info");

            }
        }
        [HttpPost]
        [Route("AddDepartment")]
        public JsonResult Post(Department dep)
        {
            try
            {
                SqlCommand cmd = new SqlCommand();
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "sp_InsertDepartment";
                SqlParameter paramDepartmentDescription = new SqlParameter("@DepartmentDescription", dep.DepartmentDescription);
                cmd.Parameters.Add(paramDepartmentDescription);
                DataTable table = new DataTable();
                string sqlDataSource = _configuration.GetConnectionString("SchoolAppCon");
                SqlDataReader myReader;
                using (SqlConnection myCon = new SqlConnection(sqlDataSource))
                {
                    myCon.Open();
                    cmd.Connection = myCon;
                    using (cmd)
                    {
                        myReader = cmd.ExecuteReader();
                        table.Load(myReader); ;

                        myReader.Close();
                        myCon.Close();
                    }
                }

                return new JsonResult("Added Successfully");
            }
            catch (Exception e)
            {
                Console.Write(e.Message);
                return new JsonResult("Error Adding Department");

            }
        }
        [HttpPut]
        [Route("UpdateDepartment")]
        public JsonResult Put(Department dep)
        {
            try
            {
                string query = @"
                    UPDATE Departments SET
                    DepartmentDescription = '" + dep.DepartmentDescription + @"' WHERE DepartmentId='" + dep.DepartmentId + "'";
                DataTable table = new DataTable();
                string sqlDataSource = _configuration.GetConnectionString("SchoolAppCon");
                SqlDataReader myReader;
                using (SqlConnection myCon = new SqlConnection(sqlDataSource))
                {
                    myCon.Open();
                    using (SqlCommand myCommand = new SqlCommand(query, myCon))
                    {
                        myReader = myCommand.ExecuteReader();
                        table.Load(myReader); ;

                        myReader.Close();
                        myCon.Close();
                    }
                }

                return new JsonResult("Updated Successfully");
            }
            catch (Exception e)
            {
                Console.Write(e.Message);
                return new JsonResult("Error Updating Department");

            }
        }
        [HttpDelete("{id}")]
        public JsonResult Delete(int id)
        {
            try
            {
                //Deleting dependant data before deleting primary data
                cmd.CommandType = CommandType.Text;
                cmd.CommandText = "DELETE FROM Teachers WHERE DepartmentId ='" + id + "'";
                using (SqlConnection myCon = new SqlConnection(_configuration.GetConnectionString("SchoolAppCon")))
                {
                    myCon.Open();
                    cmd.Connection = myCon;
                    cmd.ExecuteNonQuery();

                    myCon.Close();
                }
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandTimeout = 30;
                cmd.CommandText = "sp_DeleteDepartment";
                cmd.Parameters.Clear();
                SqlParameter paramId = new SqlParameter();
                paramId = new SqlParameter("@id", id);
                cmd.Parameters.Add(paramId);
                DataTable table = new DataTable();
                string sqlDataSource = _configuration.GetConnectionString("SchoolAppCon");
                SqlDataReader myReader;
                using (SqlConnection myCon = new SqlConnection(sqlDataSource))
                {
                    myCon.Open();
                    cmd.Connection = myCon;
                    using (cmd)
                    {
                        myReader = cmd.ExecuteReader();
                        table.Load(myReader); ;

                        myReader.Close();
                        myCon.Close();
                    }
                }

                return new JsonResult("Deleted Successfully");
            }
            catch (Exception e)
            {
                Console.Write(e.Message);
                return new JsonResult("Error Deleting Department");

            }
        }

    }
}


