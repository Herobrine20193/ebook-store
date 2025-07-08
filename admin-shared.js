// --- ADVANCED ADMIN MANAGEMENT FEATURES (for admin.html and account.html) ---
// Analytics helpers for admin panel
window.getAnalyticsSummary = function() {
  const users = JSON.parse(localStorage.getItem('users') || '[]');
  const books = JSON.parse(localStorage.getItem('books') || '[]');
  const orders = JSON.parse(localStorage.getItem('orders') || '[]');
  const revenue = orders.reduce((sum, o) => sum + (o.total || 0), 0);
  return {
    userCount: users.length,
    adminCount: users.filter(u => u.isAdmin).length,
    bookCount: books.length,
    orderCount: orders.length,
    revenue: revenue
  };
};
// Bulk delete utility (for books/users)
window.bulkDelete = function(type, ids) {
  if (!Array.isArray(ids) || !type) return false;
  if (type === 'users') {
    let users = JSON.parse(localStorage.getItem('users') || '[]');
    users = users.filter(u => !ids.includes(u.username));
    localStorage.setItem('users', JSON.stringify(users));
  } else if (type === 'books') {
    let books = JSON.parse(localStorage.getItem('books') || '[]');
    books = books.filter(b => !ids.includes(b.id));
    localStorage.setItem('books', JSON.stringify(books));
  }
  return true;
};
// Search/filter utility (for books/users/orders)
window.searchFilter = function(type, query) {
  query = (query || '').toLowerCase();
  if (type === 'users') {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    return users.filter(u =>
      u.username.toLowerCase().includes(query) ||
      (u.email && u.email.toLowerCase().includes(query))
    );
  } else if (type === 'books') {
    const books = JSON.parse(localStorage.getItem('books') || '[]');
    return books.filter(b =>
      (b.title && b.title.toLowerCase().includes(query)) ||
      (b.author && b.author.toLowerCase().includes(query))
    );
  } else if (type === 'orders') {
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    return orders.filter(o =>
      (o.username && o.username.toLowerCase().includes(query)) ||
      (o.id && o.id.toString().includes(query))
    );
  }
  return [];
};
// Inline book editing utility
window.editBook = function(bookId, newData) {
  let books = JSON.parse(localStorage.getItem('books') || '[]');
  let changed = false;
  books = books.map(b => {
    if (b.id === bookId) {
      changed = true;
      return { ...b, ...newData };
    }
    return b;
  });
  if (changed) localStorage.setItem('books', JSON.stringify(books));
  return changed;
};
// Order details utility (expandable)
window.getOrderDetails = function(orderId) {
  const orders = JSON.parse(localStorage.getItem('orders') || '[]');
  return orders.find(o => o.id == orderId);
};
// Confirm dialog utility
window.confirmAction = function(msg, cb) {
  if (window.confirm(msg)) cb && cb();
};
// Promote/demote admin utility
window.setAdminStatus = function(username, isAdmin) {
  let users = JSON.parse(localStorage.getItem('users') || '[]');
  let changed = false;
  users = users.map(u => {
    if (u.username === username) {
      if (u.isAdmin !== isAdmin) { u.isAdmin = isAdmin; changed = true; }
    }
    return u;
  });
  if (changed) localStorage.setItem('users', JSON.stringify(users));
  return changed;
};
// Responsive helper (for admin panel)
window.isMobile = function() {
  return window.innerWidth < 700;
};
