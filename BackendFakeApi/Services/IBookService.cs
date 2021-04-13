using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BackendFakeApi.Models;

namespace BackendFakeApi.Services
{
    public interface IBookService
    {
        public List<Book> GetBooks();
        public Book GetById(int id);
        public bool Update(Book book);
        public bool Delete(int id);
        
    }
}
