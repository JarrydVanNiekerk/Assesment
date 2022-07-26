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
        //Controller for Student Object -- CRUD Operations Of Student Table
{
    [Route("api/[controller]")]
    [ApiController]
    public class StudentController : ControllerBase
    {
        public SqlCommand cmd = new SqlCommand();
        private readonly IConfiguration _configuration;
        public StudentController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]
        public JsonResult GetAllStudents()
        {
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.CommandText = "sp_GetAllStudents";
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

            }
            catch (Exception e)
            {
                Console.Out.Write(e.Message);
                Console.Write("Error Getting Student Info");
            }
            return new JsonResult(table);
        }
        [HttpGet]
        [Route("ModuleStudents/{code}")]
        public JsonResult GetAllStudentsByModule(string code)
        {
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.CommandTimeout = 30;
            cmd.CommandText = "sp_ModuleStudents";
            SqlParameter paramModCode = new SqlParameter("@ModuleCode", code);
            cmd.Parameters.Add(paramModCode);
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

            }
            catch (Exception e)
            {
                Console.Write(e.Message);
                Console.Write("Error Getting Student Info");
            }
            return new JsonResult(table);
        }
        [HttpGet("{id}")]
        public JsonResult GetStudentById(int id)
        {
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.CommandTimeout = 30;
            cmd.CommandText = "sp_GetAllStudentsById";
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


            }
            catch (Exception e)
            {
                Console.Write(e.Message);
                Console.Write("Error Getting Student Info");
            }
            return new JsonResult(table);
        }
        [HttpGet]
        [Route("StudentModules/{id}")]
        public JsonResult GetAllModulesByStudent(int id)
        {
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.CommandTimeout = 30;
            cmd.CommandText = "sp_GetStudentModules";
            SqlParameter paramTeachId = new SqlParameter("@id", id);
            cmd.Parameters.Add(paramTeachId);
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
            }

            catch (Exception e)
            {
                Console.Write(e.Message);
                Console.Write("Error Getting Teacher Info");
            }

            return new JsonResult(table);
        }
        [HttpPost]
        [Route("AddStudent")]
        public JsonResult Post(Student student)
        {
            try
            {
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "sp_InsertStudent";
                SqlParameter paramfirstName = new SqlParameter("@FirstName", student.FirstName);
                SqlParameter paramlastName = new SqlParameter("@LastName", student.LastName);
                SqlParameter paramdateOfEnrollment = new SqlParameter("@DateOfEnrollment", student.DateofEnrollment.ToString("yyyy-MM-dd"));
                SqlParameter paramactive = new SqlParameter("@Active", student.Active);
                cmd.Parameters.Add(paramfirstName);
                cmd.Parameters.Add(paramlastName);
                cmd.Parameters.Add(paramdateOfEnrollment);
                cmd.Parameters.Add(paramactive);
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
            catch (DBConcurrencyException dbe)
            {
                Console.Write(dbe.Message);
                return new JsonResult("Error Adding Student");
            }


        }
        [HttpPut]
        [Route("UpdateStudent")]
        public JsonResult Put(Student student)
        {
            try
            {
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "sp_UpdateStudent";
                cmd.Parameters.Clear();
                SqlParameter paramId = new SqlParameter("@StudentId", student.StudentId);
                SqlParameter paramfirstName = new SqlParameter("@FirstName", student.FirstName);
                SqlParameter paramlastName = new SqlParameter("@LastName", student.LastName);
                SqlParameter paramDateofEnrollment = new SqlParameter("@DateofEnrollment", student.DateofEnrollment);
                SqlParameter paramActive = new SqlParameter("@Active", student.Active);
                cmd.Parameters.Add(paramId);
                cmd.Parameters.Add(paramfirstName);
                cmd.Parameters.Add(paramlastName);
                cmd.Parameters.Add(paramDateofEnrollment);
                cmd.Parameters.Add(paramActive);
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
                return new JsonResult("Updated Successfully");
            }
            catch (DBConcurrencyException dbe)
            {
                Console.Write(dbe.Message);
                return new JsonResult("Error Updating Student");
            }

        }
        [HttpDelete("{id}")]
        public JsonResult Delete(int id)
        {
            try
            {
                //Deleting dependant data before deleting primary data
                cmd.CommandType = CommandType.Text;
                cmd.CommandText = "DELETE FROM Student_Modules WHERE StudentId ='" + id + "'";
                using (SqlConnection myCon = new SqlConnection(_configuration.GetConnectionString("SchoolAppCon")))
                {
                    myCon.Open();
                    cmd.Connection = myCon;
                    cmd.ExecuteNonQuery();

                    myCon.Close();
                }
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandTimeout = 30;
                cmd.CommandText = "sp_DeleteStudent";
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
            catch (DBConcurrencyException dbe)
            {
                Console.Write(dbe.Message);
                return new JsonResult("Error Deleting Student");
            }

        }

    }
}


