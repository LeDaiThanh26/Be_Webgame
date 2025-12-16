function getMockCategoryInfo(categorySlug, categoryName) {
    // Map màu sắc và hình ảnh cho từng category
    const categoryMap = {
      'strategy': {
        image: "https://tamquocbanghiep.com/wp-content/uploads/2021/08/game-chien-thuat-mobile-4.jpeg",
        color: "#f65d4d" 
      },
      'io-games': {
        image: "https://i.ytimg.com/vi/dzMk8wtlSXk/maxresdefault.jpg",
        color: "#2ecc71" 
      },
      'shooter': {
        image: "https://th.bing.com/th/id/R.a64fd915a34c87e9a2c3d2e0f74109fb?rik=kZtUnnEipprgyw&pid=ImgRaw&r=0",
        color: "#b88b1e" 
      },
      'racing': {
        image: "https://cdn.nguyenkimmall.com/images/detailed/695/15-game-dua-xe-hap-dan-tren-dien-thoai-nen-choi-thu-thumbnail.jpg",
        color: "#3498db" 
      },
      'action': {
        image: "https://tse4.mm.bing.net/th/id/OIP.iPYJaJVhLQIpHjtm3eOeQQHaEK?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3",
        color: "#4A4A4A" 
      },
      'puzzle': {
        image: "https://tse3.mm.bing.net/th/id/OIP.5FksAyh0JR3GPO4rVBZo8AHaEJ?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3",
        color: "#6A0DAD" 
      },
      // Bạn có thể thêm nhiều danh mục khác tại đây
    };
  
    return categoryMap[categorySlug] || {
      image: "https://via.placeholder.com/400x200?text=" + encodeURIComponent(categoryName),
      color: "#95a5a6"
    };
  }

module.exports=getMockCategoryInfo;