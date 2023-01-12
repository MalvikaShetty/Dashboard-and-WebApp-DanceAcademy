using System.ComponentModel.DataAnnotations;

namespace AcademyAPI.Models
{
    public class StyleInfo
    {
        [Key]
        public int StyleId { get; set; }
        public string StyleName { get; set; }

    }
}
 