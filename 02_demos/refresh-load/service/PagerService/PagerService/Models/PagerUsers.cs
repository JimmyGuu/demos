using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PagerService.Models
{

    /// <summary>
    /// 用户信息
    /// </summary>
    public class User
    {
        /// <summary>
        /// 用户 id
        /// </summary>
        public int Id { get; set; }

        /// <summary>
        /// 用户名称
        /// </summary>
        public string Name { get; set; }

        /// <summary>
        /// 用户手机
        /// </summary>
        public string Phone { get; set; }
    }
}