using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BackendFakeApi.Models;

namespace BackendFakeApi.Services
{
    public class BookService : IBookService
    {
        private readonly List<Book> _books;

        public BookService()
        {
            _books = new List<Book>();

            _books.Add(new Book()
            {
                Id = 1,
                Title = "T1",
                Description = "wefewfwef",
                PageCount = 100,
                Excerpt = "erdewrfewrfwefewf",
                PublishDate = DateTime.Now
            });

            _books.Add(new Book()
            {
                Id = 2,
                Title = "T2",
                Description = "wefewfwef",
                PageCount = 100,
                Excerpt = "erdewrfewrfwefewf",
                PublishDate = DateTime.Now
            }          
            );

            _books.Add(new Book()
            {
                Id = 3,
                Title = "T3",
                Description = "wefewfwef",
                PageCount = 100,
                Excerpt = "erdewrfewrfwefewf",
                PublishDate = DateTime.Now
            });
            
        }
       
         
        public bool Delete(int id)
        {
            var book = GetById(id);

            if (book == null) return false;

            _books.Remove(book);

            return true;
        }

        public List<Book> GetBooks()
        {
            return _books;
        }

        public Book GetById(int id)
        {
            return _books.SingleOrDefault(x => x.Id == id);
        }

        public bool Update(Book book)
        {
            var exists = GetById(book.Id) != null;

            if (!exists) return false;

            var index = _books.FindIndex(x => x.Id == book.Id);
            _books[index] = book;
            return true;
        }
    }
}
