export default function SelectInput({
  label,
  defaultValue,
  name,
  index,
  data = [],
  handler,
}) {
  return (
    <>
      <div className="form-style1">
        <label className="heading-color ff-heading fw500 mb10">{label}</label>
        <div className="bootselect-multiselect">
          <div className="dropdown bootstrap-select">
            <button
              type="button"
              className="btn dropdown-toggle btn-light"
              data-bs-toggle="dropdown"
            >
              <div className="filter-option">
                <div className="filter-option-inner">
                  <div className="filter-option-inner-inner">
                    {defaultValue === "" ? "Select" : defaultValue}
                  </div>
                </div>
              </div>
            </button>
            <div className="dropdown-menu ">
              <div
                className="inner show"
                style={{
                  maxHeight: "300px",
                  overflowX: "auto",
                }}
              >
                <ul className="dropdown-menu inner show">
                  {data?.map((item, i) => (
                    <li key={i} className="selected active">
                      <a
                        onClick={(e) =>
                          handler(e, {
                            option: item.option,
                            value: item.value,
                            name: name,
                            index: index,
                          })
                        }
                        className={`dropdown-item ${
                          defaultValue !== null && item.value === defaultValue
                            ? "active selected"
                            : ""
                        }`}
                      >
                        <span className="text">{item.value}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
