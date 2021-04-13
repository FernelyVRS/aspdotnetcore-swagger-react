using Microsoft.AspNetCore.Mvc;
using System;
using Microsoft.Extensions.Logging;
using System.Collections.Generic;
using System.Linq;
using BackendFakeApi.Models;
using BackendFakeApi.Services;

namespace BackendFakeApi.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class BookController : Controller
    {
        private readonly IBookService _bookService;

        public BookController(IBookService bookService)
        {
            _bookService = bookService;
        }       
        
        [HttpGet]
        public IActionResult Get()
        {
            //var books = booksList.Where(b => b.Id > 0).ToArray();            
            return Ok(_bookService.GetBooks());
        }

        [HttpGet("{Id}")]
        public IActionResult Get(int Id)
        {
            //var book = booksList.Where(b => b.Id == Id).FirstOrDefault();
            var book = _bookService.GetById(Id);
            if (book == null) return NotFound();

            return Ok(book);
        }

        [HttpPost]
        public IActionResult Create(Book book)
        {           
            var b = new Book {
                Id = book.Id,
                Title = book.Title,
                Description = book.Description,
                PageCount = book.PageCount,
                Excerpt = book.Excerpt,
                PublishDate = book.PublishDate
            };

            var v = _bookService.GetById(book.Id) != null;

            if (v) return NotFound(); 
                        
            _bookService.GetBooks().Add(b);

            return Ok(Get());            
        
        }
        
        [HttpPut("{Id}")]
        public IActionResult Update([FromRoute]int Id, [FromBody] Book book)
        {
            var i = new Book
            {
                Id = book.Id,
                Title = book.Title,
                Description = book.Description,
                PageCount = book.PageCount,
                Excerpt = book.Excerpt,
                PublishDate = book.PublishDate
            };

            var update = _bookService.Update(i);

            if (update) return Ok(i);

            return NotFound();
        }

        [HttpDelete("{Id}")]
        public IActionResult Delete(int Id)
        {
            //var bookDeleted = booksList.Where(b => b.Id == Id).FirstOrDefault();

            var bookDeleted = _bookService.Delete(Id);

            if (bookDeleted) return NoContent();
                        
            return NotFound();
        }
    }
}
