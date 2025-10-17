//basically add any possible query we may need here
const checkEmailExists = "SELECT * FROM employees WHERE email = ?";
const getBranchDirectors = "SELECT * FROM branch_directors";
const getDirectorIdByDepartment = "SELECT Director_id FROM branch_directors WHERE Branch_title = ?";
const getEmployees = "SELECT * FROM employees";
const addEmployee = "INSERT INTO employees (department, director_id, email, first_name, last_name, username, password, phone_number) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
const getExhibit = "SELECT * FROM exhibits";
const addExhibit = "INSERT INTO exhibits (Description, Collections, Location, image_url, explanation) VALUES (?, ?, ?, ?, ?)";
const updateExhibit = "UPDATE exhibits SET Description = ?, Collections = ?, Location = ?, image_url = ?, explanation = ? WHERE Exhibit_id = ?";
const markExhibitForDeletion ="UPDATE exhibits SET active = 0 WHERE Exhibit_id = ?";
const markExhibitForReactivation ="UPDATE exhibits SET active = 1 WHERE Exhibit_id = ?";
const markEmployeeForDeletion ="UPDATE employees SET Active = 0 WHERE employee_id = ?";
const markEmployeeForRehire ="UPDATE employees SET Active = 1 WHERE employee_id = ?";
const addComplaint = 'INSERT INTO complaints (name, branch, exhibit_id, customer_id, description) VALUES (?, ?, ?, ?, ?)';
const updateEmployeeInfo = "UPDATE employees SET department = ?, director_id = ?, email = ?, first_name = ?, last_name = ? WHERE employee_id = ?";
const addCustomer = "INSERT INTO customers (first_name, last_name, email, phone_number, username, password, address, date_of_birth) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
const getCustomerInfo = "SELECT * FROM customers WHERE customer_id = ?";
const getAdminInfo = "SELECT * FROM branch_directors WHERE Director_id = ?";
const getEmployeeInfo = "SELECT * FROM employees WHERE employee_id = ?";
const updateCustomerInfo = "UPDATE customers SET first_name = ?, last_name = ?, email = ?, phone_number = ?, gender = ?, accessibility_needs = ?, address = ?, date_of_birth = ? WHERE customer_id = ?";
const updateAdminInfo = "UPDATE branch_directors SET first_name = ?, last_name = ?, email = ?, phone_number = ?, gender = ?, accessibility_needs = ?, address = ?, date_of_birth = ? WHERE Director_id = ?";
const updateEmployeeInfoAll = "UPDATE employees SET first_name = ?, last_name = ?, email = ?, phone_number = ?, gender = ?, accessibility_needs = ?, address = ?, date_of_birth = ? WHERE employee_id = ?";
const addItem = "INSERT INTO items (title, price, description, quantity, image_url) VALUES(?, ?, ?, ?, ?)";
const getItem ="SELECT * FROM items WHERE item_id NOT IN (9, 10, 11, 12)";
const updateItem = "UPDATE items SET title = ?, price = ?, description = ?, quantity = ?, image_url = ? WHERE item_id= ?";
const markItemForDeletion ="UPDATE items SET active = 0 WHERE item_id = ?";
const getArtWorks = "SELECT * FROM art_pieces";
const updateArtWork = "UPDATE art_pieces SET title = ?, artist = ?, image = ?, medium = ?, creationDate = ? WHERE art_id = ?";
const markArtWorkForDeletion ="UPDATE art_pieces SET active = 0 WHERE art_id = ?";
const addArtWork = "INSERT INTO art_pieces (title, artist, creationDate, medium, image) VALUES (?, ?, ?, ?, ?)";
const addFood = "INSERT INTO restaurant (name, description, image, price) VALUES(?, ?, ?, ?)";
const markFoodForDeletion ="UPDATE restaurant SET active = 0 WHERE restaurant_id = ?";
const updateFood = "UPDATE restaurant SET name = ?, description = ?, image = ?, price = ? WHERE restaurant_id = ?";
const getFood = "SELECT * FROM restaurant";
const getMessages = "SELECT * FROM message_queue";
const getEmployeeDepartment = "SELECT department FROM employees WHERE employee_id = ?";
const addOrder = "INSERT INTO orders (customer_id, item_id, quantity, total_price, order_date) VALUES (?, ?, ?, ?, ?)";
const updateItemQuantity = "UPDATE items SET quantity = quantity - ? WHERE item_id = ?";
const getQuantity = "SELECT quantity FROM items WHERE item_id = ?";

const getComplaints = `
    SELECT 
    complaints.complaint_id,
    customers.first_name,
    customers.last_name,
    complaints.branch,
    complaints.description,
    complaints.date_and_time
        FROM 
        complaints
    INNER JOIN 
    customers ON complaints.customer_id = customers.customer_id
  `;
const getFirstName = `
SELECT 
    CASE 
        WHEN ? = 'branch_directors' THEN 
            (SELECT first_name FROM branch_directors WHERE Director_id = ?)
        WHEN ? = 'employees' THEN 
            (SELECT first_name FROM employees WHERE employee_id = ?)
        WHEN ? = 'customers' THEN 
            (SELECT first_name FROM customers WHERE customer_id = ?)
        ELSE NULL 
    END AS first_name`;


const authenticateUser = `
(SELECT Director_id AS user_id, 'branch_directors' AS table_name
FROM branch_directors
WHERE username = ? AND password = ?)
UNION
(SELECT customer_id AS user_id, 'customers' AS table_name
FROM customers
WHERE username = ? AND password = ?)
UNION
(SELECT employee_id AS user_id, 'employees' AS table_name
FROM employees
WHERE username = ? AND password = ?)`;

const exhibitReport = `SELECT 
e.Description AS Exhibit_Name,
COUNT(t.Ticket_id) AS Tickets_Bought,
SUM(t.Price) AS Amount_Made,
COUNT(c.complaint_id) AS Complaints_Received
FROM 
exhibits e
LEFT JOIN 
tickets t ON e.Exhibit_id = t.exhibit_id
LEFT JOIN 
complaints c ON e.Exhibit_id = c.exhibit_id
GROUP BY 
e.Exhibit_id, e.Description;

`;

const salesReport = `SELECT 
CONCAT(c.first_name, ' ', c.last_name) AS customer_name,
i.title AS item_bought,
o.quantity AS quantity_bought,
o.total_price AS total_price,
o.order_date AS order_date
FROM 
customers c
JOIN 
orders o ON c.customer_id = o.customer_id
JOIN 
items i ON o.item_id = i.item_id;`;

const itemsReport = `SELECT 
CONCAT(c.first_name, ' ', c.last_name) AS customer_name,
i.title AS item_bought,
o.quantity AS quantity_bought,
o.total_price AS total_price,
o.order_date AS order_date
FROM 
customers c
JOIN 
orders o ON c.customer_id = o.customer_id
JOIN 
items i ON o.item_id = i.item_id AND i.item_id NOT IN (9, 10, 11, 12);`;

const ticketsReport = `SELECT 
CONCAT(c.first_name, ' ', c.last_name) AS customer_name,
i.title AS item_bought,
o.quantity AS quantity_bought,
o.total_price AS total_price,
o.order_date AS order_date
FROM 
customers c
JOIN 
orders o ON c.customer_id = o.customer_id
JOIN 
items i ON o.item_id = i.item_id AND i.item_id IN (9, 10, 11, 12);`;

module.exports = {
    getBranchDirectors,
    getEmployees,
    addEmployee,
    updateEmployeeInfo,
    markEmployeeForDeletion,
    markEmployeeForRehire,
    checkEmailExists,
    getDirectorIdByDepartment,
    getExhibit,
    addExhibit,
    markExhibitForDeletion,
    updateExhibit,
    getComplaints,
    addComplaint,
    authenticateUser,
    addCustomer,
    getCustomerInfo,
    updateCustomerInfo,
    addItem,
    getItem,
    updateItem,
    markItemForDeletion,
    getArtWorks,
    updateArtWork,
    markArtWorkForDeletion,
    addArtWork,
    addFood,
    markFoodForDeletion,
    updateFood,
    getFood,
    getFirstName,
    getEmployeeDepartment,
    getMessages,
    exhibitReport,
    addOrder,
    salesReport,
    updateItemQuantity,
    markExhibitForReactivation,
    updateAdminInfo,
    updateEmployeeInfoAll,
    getAdminInfo,
    getEmployeeInfo,
    itemsReport,
    ticketsReport,
    getQuantity
};