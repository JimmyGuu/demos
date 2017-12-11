using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PagerService.Models
{
    /// <summary>
    /// 分页查询条件
    /// </summary>
    public class PagerConfig
    {
        /// <summary>
        /// 当前页
        /// </summary>
        public int PageCurrent { get; set; }

        /// <summary>
        /// 分页大小
        /// </summary>
        public int PageSize { get; set; }
    }
}