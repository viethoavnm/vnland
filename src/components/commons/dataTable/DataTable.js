import React, { Component } from "react";
import PropTypes from 'prop-types';
import "./DataTable.scss";
import Checkbox from "../checkbox/Checkbox";

export default class DataTable extends Component {

  handleCheckbox = (value, checked) => {
    this.props.onSelect(value, checked);
  }

  handleDeleteOne = (value, item) => {
    this.props.onSelect(value, true);
    this.props.onDelete(item);
  }

  onClickCheckbox = (id) => {
    if ($(id)) {
      $(id).click();
    }
  }

  render() {
    const data = this.props.data;
    let columns = [];
    if (data.length > 0) {
      for (var i in data[0]) {
        columns.push(i);
      }
    }

    let countSelected = 0;
    for (let i = 0; i < this.props.selected.length; i++) {
      for (let j = 0; j < this.props.data.length; j++) {
        if (this.props.selected[i].Id == this.props.data[j].Id) {
          countSelected++;
        }
      }
    }

    return (
      <div className="data-table">
        <div className="d-flex">

          <div className="mr-auto">
            {
              this.props.listDropdown1 && <div className="btn-group mr-right mr-bot">
                <div className="table-sort-label">{this.props.titleDropdown1}</div>
                <button type="button" className="btn dropdown-toggle" data-toggle="dropdown"
                  aria-haspopup="true" aria-expanded="false">
                  {
                    this.props.selectedDropdown1 ? this.props.selectedDropdown1.title : this.props.titleDropdown1
                  }
                </button>
                <div className="dropdown-menu">
                  {
                    this.props.listDropdown1 && this.props.listDropdown1.map((obj1, index) => {
                      return <a key={index} className="dropdown-item" onClick={() => this.props.onSelectDropdown1(obj1)}>{obj1.title}</a>
                    })
                  }
                </div>
              </div>
            }
            {
              this.props.listDropdown2 && <div className="btn-group mr-right mr-bot">
                <div className="table-sort-label">{this.props.titleDropdown2}</div>
                <button type="button" className="btn dropdown-toggle" data-toggle="dropdown"
                  aria-haspopup="true" aria-expanded="false">
                  {
                    this.props.selectedDropdown2 ? this.props.selectedDropdown2.title : this.props.titleDropdown2
                  }
                </button>
                <div className="dropdown-menu">
                  {
                    this.props.listDropdown2 && this.props.listDropdown2.map((obj2, index) => {
                      return <a key={index} className="dropdown-item" onClick={() => this.props.onSelectDropdown2(obj2)}>{obj2.title}</a>
                    })
                  }
                </div>
              </div>
            }
            {
              this.props.listDropdown3 && <div className="btn-group mr-right mr-bot">
                <div className="table-sort-label">{this.props.titleDropdown3}</div>
                <button type="button" className="btn dropdown-toggle" data-toggle="dropdown"
                  aria-haspopup="true" aria-expanded="false">
                  {
                    this.props.selectedDropdown3 ? this.props.selectedDropdown3.title : this.props.titleDropdown3
                  }
                </button>
                <div className="dropdown-menu">
                  {
                    this.props.listDropdown3 && this.props.listDropdown3.map((obj3, index) => {
                      return <a key={index} className="dropdown-item" onClick={() => this.props.onSelectDropdown3(obj3)}>{obj3.title}</a>
                    })
                  }
                </div>
              </div>
            }
            {
              this.props.listDropdown4 && <div className="btn-group mr-bot">
                <div className="table-sort-label">{this.props.titleDropdown4}</div>
                <button type="button" className="btn dropdown-toggle" data-toggle="dropdown"
                  aria-haspopup="true" aria-expanded="false">
                  {
                    this.props.selectedDropdown4 ? this.props.selectedDropdown4.title : this.props.titleDropdown4
                  }
                </button>
                <div className="dropdown-menu">
                  {
                    this.props.listDropdown4 && this.props.listDropdown4.map((obj4, index) => {
                      return <a key={index} className="dropdown-item" onClick={() => this.props.onSelectDropdown4(obj4)}>{obj4.title}</a>
                    })
                  }
                </div>
              </div>
            }
          </div>
          {
            this.props.selected.length > 0 && <div className="col">
              {/* <button type="button" className="btn btn-genQR mr-bot" onClick={(e) => this.props.handleGenQRCode("a4")}>
                Gen QRCode A4
              </button> */}
              {/* <button
                type="button" className="btn btn-genQR mr-bot" onClick={(e) => this.props.handleGenQRCode("a3")}>
                Gen QRCode A3 (x6)
              </button> */}
              {
                this.props.handleGenQRCode && <button
                  type="button" className="btn btn-genQR mr-bot" onClick={(e) => this.props.handleGenQRCode("a3-x8")}>
                  Gen QRCode (x8)
              </button>
              }
              {
                this.props.handleGenMultiQRCheckin && this.props.selected.length > 0 && <button
                  type="button" className="btn btn-genQR mr-bot" onClick={this.props.handleGenMultiQRCheckin}>
                  Gen Multi QRCheckIn
                </button>
              }
              {
                this.props.handleGenQRCheckin && this.props.selected.length == 1 && <button
                  type="button" className="btn btn-genQR mr-bot" onClick={this.props.handleGenQRCheckin}>
                  Gen QRCheckIn
                </button>
              }
              {
                this.props.handleGenCheckinGuideline && this.props.selected.length == 1 && <button
                  type="button" className="btn btn-genQR mr-bot" onClick={this.props.handleGenCheckinGuideline}>
                  Gen Guideline
                </button>
              }
            </div>
          }

          <div className="table-sort-label">Sort by</div>
          <div className="dropdown">
            <button className="btn dropdown-toggle" type="button" id="dropdownRows" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              {this.props.pageSize + " rows"}
            </button>
            <div className="dropdown-menu dropdown-menu-right select-row" aria-labelledby="dropdownRows">
              <a className="dropdown-item" onClick={(e) => this.props.onChangePageSize(5)}>5 rows</a>
              <a className="dropdown-item" onClick={(e) => this.props.onChangePageSize(10)}>10 rows</a>
              <a className="dropdown-item" onClick={(e) => this.props.onChangePageSize(15)}>15 rows</a>
              <a className="dropdown-item" onClick={(e) => this.props.onChangePageSize(20)}>20 rows</a>
            </div>
          </div>
        </div>
        {
          this.props.selected.length > 0 && <div className="table-sort-label">{`Selected: ${this.props.selected.length}`}</div>
        }
        <table className="cus-table">
          <tbody>
            <tr>
              <th>
                <Checkbox id={this.props.id} title="ALL" value="ALL" checked={countSelected == data.length && data.length > 0} onChange={this.handleCheckbox} />
              </th>
              {
                columns.length > 0 && columns.map((item, index) => {
                  if (item != "Id") {
                    return <th key={index}>{item.toUpperCase()}</th>
                  }
                })
              }
              <th></th>
            </tr>
            {
              data.length > 0 && data.map((item, index) => {
                let checked = false;
                for (let i = 0; i < this.props.selected.length; i++) {
                  if (this.props.selected[i].Id == item.Id) {
                    checked = true;
                  }
                }
                return <tr key={index}>
                  <td>
                    <Checkbox id={this.props.id} value={index} checked={checked} onChange={this.handleCheckbox} />
                  </td>
                  {
                    columns.length > 0 && columns.map((head, index) => {
                      if (head == "Id") {
                        return null;
                      }
                      if (head == "Image") {
                        return <td key={index}>
                          {
                            item.Image.map((img, index) => {
                              if (index < 3) {
                                return <img key={index} src={img} />
                              }
                            })
                          }
                        </td>
                      } else {
                        return <td key={index}>
                          {item[head]}
                        </td>
                      }
                    })
                  }
                  {
                    this.props.handleAssignStaff && <td>
                      <div className="assign-action" onClick={(e) => this.props.handleAssignStaff(item)}>Assign</div>
                    </td>
                  }
                  {
                    this.props.onDeleteOne && this.props.onUpdate && <td>
                      <div className="action">
                        <i className="fas fa-edit" onClick={(e) => this.props.onUpdate(item)}></i>
                        <i className="fas fa-trash-alt" onClick={(e) => this.handleDeleteOne(index, item)}></i>
                      </div>
                      <div></div>
                    </td>
                  }
                  {
                    this.props.onActive && <td>
                      <a className={item.Status === "Active" ? "action-text deactive" : "action-text"} onClick={(e) => this.props.onActive(item, item.Status)}>{item.Status === "Active" ? "Deactive" : "Active"}</a>
                    </td>
                  }
                </tr>
              })
            }

          </tbody>
        </table>
        {
          data.length == 0 && <div className="box-nocontent">
            Select <a>Add New</a> to add new
          </div>
        }
        {
          this.props.selected.length > 0 && this.props.onDelete && <button type="button" className="btn btn-delete ml-2" onClick={this.props.onDelete}>
            <i className="fa fa-trash-o" aria-hidden="true" onClick={this.props.onDelete} /> Delete
        </button>
        }
      </div>
    );
  }
}
DataTable.propTypes = {
  id: PropTypes.string,
  data: PropTypes.array,
  selected: PropTypes.array,
  pageSize: PropTypes.number,
  titleDropdown1: PropTypes.string,
  titleDropdown2: PropTypes.string,
  titleDropdown3: PropTypes.string,
  titleDropdown4: PropTypes.string,
  selectedDropdown1: PropTypes.object,
  selectedDropdown2: PropTypes.object,
  selectedDropdown3: PropTypes.object,
  selectedDropdown4: PropTypes.object,
  listDropdown1: PropTypes.array,
  listDropdown2: PropTypes.array,
  listDropdown3: PropTypes.array,
  listDropdown4: PropTypes.array,
  onSelectDropdown1: PropTypes.func,
  onSelectDropdown2: PropTypes.func,
  onSelectDropdown3: PropTypes.func,
  onSelectDropdown4: PropTypes.func,
  onSelect: PropTypes.func,
  onUpdate: PropTypes.func,
  onDelete: PropTypes.func,
  onDeleteOne: PropTypes.func,
  onChangePageSize: PropTypes.func,
  handleGenQRCode: PropTypes.func,
  onActive: PropTypes.func
};