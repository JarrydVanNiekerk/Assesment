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
        //Controller for Teacher Object -- CRUD Operations Of Teacher Table
{
    [Route("api/[controller]")]
    [ApiController]
    public class TeacherController : ControllerBase
    {
        public SqlCommand cmd = new SqlCommand();
        private readonly IConfiguration _configuration;


        public TeacherController(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        [HttpGet]
        [Route("ModuleTeachers/{code}")]
        public JsonResult GetAllTeachersByModule(string code)
        {
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.CommandTimeout = 30;
            cmd.CommandText = "sp_ModuleTeachers";
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
                Console.Write("Error Getting Teacher Info");
            }

            return new JsonResult(table);
        }
        [HttpGet]
        [Route("TeacherModules/{id}")]
        public JsonResult GetAllModulesByTeacher(int id)
        {
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.CommandTimeout = 30;
            cmd.CommandText = "sp_GetTeacherModules";
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
        [HttpGet]
        public JsonResult Get()
        {
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.CommandText = "sp_GetAllTeachers";
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
        [HttpGet("{id}")]
        public JsonResult GetTeacherById(int id)
        {
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.CommandTimeout = 30;
            cmd.CommandText = "sp_GetAllTeachersById";
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
                Console.Write("Error Getting Teacher Info");
            }

            return new JsonResult(table);
        }
        [HttpPost]
        [Route("AddTeacher")]
        public JsonResult Post(Teacher teacher)
        {
            try
            {
                cmd.Parameters.Clear();
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "sp_InsertTeacher";
                SqlParameter paramfirstName = new SqlParameter("@FirstName", teacher.FirstName);
                SqlParameter paramlastName = new SqlParameter("@LastName", teacher.LastName);
                SqlParameter paramdateBegan = new SqlParameter("@DateBegan", teacher.DateBegan);
                SqlParameter paramDepartmentDescription = new SqlParameter("@DepartmentDescription", teacher.DepartmentDescription);
                cmd.Parameters.Add(paramfirstName);
                cmd.Parameters.Add(paramlastName);
                cmd.Parameters.Add(paramdateBegan);
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
            catch (DBConcurrencyException dbe)
            {
                Console.Write(dbe.Message);
                return new JsonResult("Error Adding Teacher");
            }


        }
        [HttpPut]
        [Route("UpdateTeacher")]
        public JsonResult Put(Teacher teacher)
        {
            try
            {
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "sp_UpdateTeacher";
                cmd.Parameters.Clear();
                SqlParameter paramId = new SqlParameter("@TeacherId", teacher.TeacherId);
                SqlParameter paramfirstName = new SqlParameter("@FirstName", teacher.FirstName);
                SqlParameter paramlastName = new SqlParameter("@LastName", teacher.LastName);
                SqlParameter paramdateBegan = new SqlParameter("@DateBegan", teacher.DateBegan);
                SqlParameter paramDepartmentDescription = new SqlParameter("@DepartmentDescription", teacher.DepartmentDescription);
                cmd.Parameters.Add(paramId);
                cmd.Parameters.Add(paramfirstName);
                cmd.Parameters.Add(paramlastName);
                cmd.Parameters.Add(paramdateBegan);
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
                return new JsonResult("Updated Successfully");
            }
            catch (DBConcurrencyException dbe)
            {
                Console.Write(dbe.Message);
                return new JsonResult("Error Updating Teacher");
            }


        }
        [HttpDelete("{id}")]
        public JsonResult Delete(int id)
        {
            try
            {
                //Deleting dependant data before deleting primary data
                cmd.CommandType = CommandType.Text;
                cmd.CommandText = "DELETE FROM Teacher_Modules WHERE TeacherId ='" + id + "'";
                using (SqlConnection myCon = new SqlConnection(_configuration.GetConnectionString("SchoolAppCon")))
                {
                    myCon.Open();
                    cmd.Connection = myCon;
                    cmd.ExecuteNonQuery();

                    myCon.Close();
                }

                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandTimeout = 30;
                cmd.CommandText = "sp_DeleteTeacher";
                cmd.Parameters.Clear();
                SqlParameter paramId = new SqlParameter();
                paramId = new SqlParameter("@id", id);
                cmd.Parameters.Add(paramId);
                DataTable table = new DataTable();
                SqlDataReader myReader;
                using (SqlConnection myCon = new SqlConnection(_configuration.GetConnectionString("SchoolAppCon")))
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
                return new JsonResult("Error Deleting Teacher");
            }

        }

    }
}
