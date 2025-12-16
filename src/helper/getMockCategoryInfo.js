function getMockCategoryInfo(categorySlug, categoryName) {
    // Map màu sắc và hình ảnh cho từng category
    const categoryMap = {
      'strategy': {
        image: "https://tse3.mm.bing.net/th/id/OIP.5FksAyh0JR3GPO4rVBZo8AHaEJ?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3",
        color: "#f65d4d" 
      },
      'io-games': {
        image: "https://tse4.mm.bing.net/th/id/OIP.BjSEPZ5nXCnMDMqBBVzBhQHaD4?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3",
        color: "#db61c9" 
      },
      'shooter': {
        image: "https://th.bing.com/th/id/R.a64fd915a34c87e9a2c3d2e0f74109fb?rik=kZtUnnEipprgyw&pid=ImgRaw&r=0",
        color: "#b88b1e" 
      },
      'racing': {
        image: "https://example.com/racing-banner.jpg",
        color: "#3498db" 
      },
      'action': {
        image: "https://example.com/action-banner.jpg",
        color: "#2ecc71" 
      },
      'puzzle': {
        image: "https://example.com/puzzle-banner.jpg",
        color: "#e67e22" 
      },
      // Bạn có thể thêm nhiều danh mục khác tại đây
    };
  
    return categoryMap[categorySlug] || {
      image: "https://via.placeholder.com/400x200?text=" + encodeURIComponent(categoryName),
      color: "#95a5a6"
    };
  }

module.exports=getMockCategoryInfo;