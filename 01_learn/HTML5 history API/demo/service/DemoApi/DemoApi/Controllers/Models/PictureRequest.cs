using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApplication2.Controllers.Models
{
    /// <summary>
    /// 图片接口请求数据
    /// </summary>
    public class PictureRequest
    {
        /// <summary>
        /// id
        /// </summary>
        public int Id { get; set; }
        /// <summary>
        /// 客户端类型
        /// </summary>
        public string ClientType { get; set; }
    }
}