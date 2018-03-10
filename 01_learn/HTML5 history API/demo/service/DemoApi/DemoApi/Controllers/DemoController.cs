using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using WebApplication2.Controllers.Models;
using WebApplication2.Models;

namespace WebApplication2.Controllers
{
    /// <summary>
    /// 测试api
    /// </summary>
    [RoutePrefix("api/Demo")]
    public class DemoController : ApiController
    {
        /// <summary>
        /// 请求图片数据
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        [Route("GetPicture")]
        [HttpPost]
        public IHttpActionResult GetPicture([FromBody]PictureRequest data)
        {
            Picture picture = new Picture();

            switch (data.Id)
            {
                case 1:
                    picture.Id = 1;
                    picture.Src = "./img/1.jpg";
                    break;
                case 2:
                    picture.Id = 2;
                    picture.Src = "./img/2.jpg";
                    break;
                case 3:
                    picture.Id = 3;
                    picture.Src = "./img/3.jpg";
                    break;
                case 4:
                    picture.Id = 4;
                    picture.Src = "./img/4.jpg";
                    break;
                case 5:
                    picture.Id = 5;
                    picture.Src = "./img/5.jpg";
                    break;
            }

            return Ok(picture);
        }

        /// <summary>
        /// Get请求测试接口
        /// </summary>
        /// <param name="str"></param>
        /// <returns></returns>
        [Route("Test")]
        [HttpGet]
        public IHttpActionResult GetTest([FromUri] string str)
        {
            string strR = "fucker";
            if(!string.IsNullOrEmpty(str)) return Ok("Hello, " + str);
            return Ok("Hello, " + strR);
        }

        /// <summary>
        /// FormData测试接口
        /// </summary>
        [Route("FormData")]
        [HttpPost]
        public string FormData()
        {
            string result = "Hello, ";
            var httpRequest = HttpContext.Current.Request;
            string userName = httpRequest.Form["username"];

            return result + userName;
        }

        /// <summary>
        /// 上传文件测试接口
        /// </summary>
        /// <returns></returns>
        [Route("UploadFile")]
        [HttpPost]
        public string UploadFile()
        {
            var httpRequest = HttpContext.Current.Request;
            System.Text.StringBuilder ss = new System.Text.StringBuilder();
            ss.Append("成功上传文件" + Environment.NewLine);

            foreach (string key in httpRequest.Files)  // 文件键  
            {
                var postedFile = httpRequest.Files[key];    // 获取文件键对应的文件对象  
                string file = postedFile.FileName;
                if (!string.IsNullOrEmpty(file))
                {
                    postedFile.SaveAs(HttpContext.Current.Server.MapPath("~/Files/") + file);
                    ss.Append(file + Environment.NewLine);
                }
            }

            return ss.ToString();
        }
    }
}
