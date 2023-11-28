import "./userTable.css";
import { useState } from "react";
import ToggleButton from "../../common-components/toggle-button/toggleButton";
import { useSelector } from "react-redux";
import InputField from "../../common-components/input-field/inputField";

const UserTable = () => {
  const userTableData = useSelector((state) => state.userData.userData);
  const [userInfo, setUserInfo] = useState(userTableData);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const pageNumbers = [];
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = userInfo.slice(indexOfFirstItem, indexOfLastItem);
  for (let i = 1; i <= Math.ceil(userInfo.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }
  const handlePagination = (pageNum) => {
    setCurrentPage(pageNum);
  };
  const handleNextBtnAction = () => {
    if (currentPage >= pageNumbers.length) {
      setCurrentPage(currentPage);
    } else {
      setCurrentPage(currentPage + 1);
    }
  };
  const handlePrevBtnAction = () => {
    if (currentPage <= 1) {
      setCurrentPage(currentPage);
    } else {
      setCurrentPage(currentPage - 1);
    }
  };
  const handleEntriesChange = (e) => {
    if (e.target.value > 10 && e.target.value <= userInfo.length) {
      setItemsPerPage(e.target.value);
    }
  };
  const handleSearchValue = (event) => {
    const searchValue = event.target.value.toLowerCase();

    const filteredData = userTableData.filter((filterUsers) => {
      const userNameMatch = filterUsers.userName
        .toLowerCase()
        .includes(searchValue);
      const emailMatch = filterUsers.email.toLowerCase().includes(searchValue);
      return userNameMatch || emailMatch;
    });
    setUserInfo(filteredData);
  };
  return (
    <div className="userDataTableContainer">
      <div className="userDataTableHeading">
        <h1>User Table</h1>
        <InputField
          placeholder="Search by name/email"
          onChange={handleSearchValue}
        />
      </div>
      <div className="userDataTableWrapper">
        <div className="showingEntriesWrapper">
          <p>Showing</p>
          <input type="number" onChange={(e) => handleEntriesChange(e)} />
          <p>entries</p>
        </div>
        <div className="userTableInnerWraapper">
          {currentItems.length !== 0 ? (
            <table className="userDataTable">
              <thead className="userDataTableHead">
                <tr>
                  <th>#</th>
                  <th>EMAIL</th>
                  <th>NAME</th>
                  <th>PHONE NO</th>
                  <th>COUNTRY</th>
                  <th>STATE</th>
                  <th>ROLE</th>
                  <th>ACTIVE</th>
                </tr>
              </thead>

              <tbody className="userDataTableBody">
                {currentItems.map((userData, index) => (
                  <tr key={index}>
                    <td>{userData.userId}</td>
                    <td>{userData.email}</td>
                    <td className="userNameData">
                      <img src={userData.userImgSrc} alt="" />
                      {userData.userName}
                    </td>
                    <td>{userData.phoneNumber}</td>
                    <td>{userData.country}</td>
                    <td>{userData.countryState}</td>

                    <td>{userData.userRole}</td>
                    <td>
                      <ToggleButton
                        readOnly={true}
                        check={userData.userStatus ? true : false}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="noDataMessage">Nothing to show</p>
          )}
          {pageNumbers.length > 1 && (
            <div className="table-pagination-wrapper">
              <p className="paginationDesc">
                Showing {currentPage} to {pageNumbers.length} of{" "}
                {userInfo.length} entries
              </p>
              <ul className="pagination">
                <button
                  className="pagination-action-btn"
                  onClick={handlePrevBtnAction}
                >
                  Previous
                </button>
                {pageNumbers.map((number) => (
                  <li key={number} className="page-item">
                    <a
                      onClick={() => handlePagination(number)}
                      href="#"
                      className={`page-link ${
                        currentPage === number && "activePageLink"
                      }`}
                    >
                      {number}
                    </a>
                  </li>
                ))}
                <button
                  className="pagination-action-btn"
                  onClick={handleNextBtnAction}
                >
                  Next
                </button>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserTable;
