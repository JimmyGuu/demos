using PagerService.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace PagerService.Controllers
{
    [RoutePrefix("Values")]
    public class ValuesController : ApiController
    {
        [Route("Pager")]
        [HttpGet]
        public List<User> Pager([FromUri]int PageCurrent, int PageSize)
        {
            var users = new List<User>();

            var current = PageCurrent;
            var size = PageSize;
            for (int i = 0 + ((current - 1) * size); i < (current * size); i++)
            {
                var user = new User();
                user.Id = i;
                user.Name = "usr_" + i;
                
                user.Phone = "1301234" + i;

                users.Add(user);
            }

            return users;
        }

        // GET api/values
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/values/5
        public string Get(int id)
        {
            return "value";
        }

        // POST api/values
        public void Post([FromBody]string value)
        {
        }

        // PUT api/values/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/values/5
        public void Delete(int id)
        {
        }
    }
}
