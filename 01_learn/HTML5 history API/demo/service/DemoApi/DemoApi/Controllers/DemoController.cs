using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.Http;
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
    }
}
