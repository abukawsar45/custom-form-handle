import React from 'react';
import './CustomSelect.css';
import Input from '../utils/input/Input';

const CustomSelect = ({
  formType,
  isClearable,
  isSearchable,
  isDisabled,
  setIsDisabled,
  options,
  value,
  placeholder,
  isGrouped,
  setSearchValue,
  isMulti,
  onChangeHandler,
  onMenuOpen,
  onSearchHandler,
  allSelectedData,
  selectValue,
  setSelectValue,
  handleDelete,
}) => {
  return (
    <div className=' kzui-main_container'>
      <div className='kzui-left_container'>
        {' '}
        <div>
          <h4>{formType}</h4>

          {/* search box */}
          <div>
            <div className=''>
              <p className=''>Search Box</p>
              {isMulti ? (
                <input
                  type='text'
                  className='kzui-search_box'
                  value={value}
                  placeholder={placeholder}
                  onChange={isSearchable ? onSearchHandler : null}
                  disabled={isDisabled}
                />
              ) : (
                <input
                  type='text'
                  className='kzui-search_box'
                  value={value}
                  placeholder={placeholder}
                  onChange={isSearchable ? onSearchHandler : null}
                  disabled={isDisabled}
                />
              )}
              <button
                className='kzui-btn_clear kzui-clickable'
                onClick={isClearable}
              >
                Clear
              </button>
            </div>
            {/* university name */}
            <div className=''>
              {
                <div className=''>
                  {options
                    .filter((option) =>
                      isSearchable
                        ? option.toLowerCase().includes(value.toLowerCase())
                        : true
                    )
                    .map((option, ind) => (
                      <div key={option + ind + 'a'}>
                        {isMulti ? (
                          <option
                            className={`${
                              value.toLowerCase() === option.toLowerCase()
                                ? 'kzui-selected_text'
                                : 'kzui-university_name'
                            } ${
                              !isDisabled &&
                              'kzui-clickable kzui-university_name_hover'
                            }`}
                            onClick={(e) =>
                              !isDisabled && setSearchValue(option)
                            }
                            value={option}
                          >
                            {option}
                          </option>
                        ) : (
                          <option
                            className={`${
                              value.toLowerCase() === option.toLowerCase()
                                ? 'kzui-selected_text'
                                : 'kzui-university_name'
                            } ${
                              !isDisabled &&
                              'kzui-clickable kzui-university_name_hover'
                            }`}
                            onClick={(e) =>
                              !isDisabled && setSearchValue(option)
                            }
                            value={option}
                          >
                            {option}
                          </option>
                        )}
                      </div>
                    ))}
                </div>
              }
            </div>
            <div className='kzui-display_flex'>
              {isMulti ? (
                <>
                  <input
                    onClick={() => setIsDisabled(!isDisabled)}
                    type='checkbox'
                    name='disabled'
                    id='disabledForMulti'
                  />
                  <label htmlFor='disabledForMulti'>Disabled </label>
                </>
              ) : (
                <>
                  <input
                    onClick={() => setIsDisabled(!isDisabled)}
                    type='checkbox'
                    name='disabled'
                    id='disabled'
                  />
                  <label htmlFor='disabled'>Disabled </label>
                </>
              )}
            </div>
          </div>
        </div>
        {/* choose university */}
        <div className='kzui-margin_top'>
          {isMulti ? (
            <h4>Select your all favorites university</h4>
          ) : (
            <h4>Select your favorite university</h4>
          )}

          {isGrouped
            ? options.map((option, ind) => (
                <div
                  className='kzui-display_flex'
                  key={option + ind + 'abab'}
                  onChange={(e) =>
                    setSelectValue({ type: e.target.checked, name: option })
                  }
                >
                  <Input
                    className='kzui-checkbox_custom'
                    type='checkbox'
                    name='university_name'
                    id={option + ind}
                    htmlFor={option + ind}
                    label={option}
                  />
                </div>
              ))
            : options.map((option, ind) => (
                <div
                  className='kzui-display_flex'
                  key={option + ind + 'ab'}
                  onChange={(e) => setSelectValue(option)}
                >
                  <Input
                    className='kzui-checkbox_custom'
                    type='radio'
                    name='uni_name'
                    id={option}
                    htmlFor={option}
                    label={option}
                  />
                </div>
              ))}
        </div>
        {isMulti ? (
          <button
            type='submit'
            disabled={selectValue.length === 0}
            className={`kzui-btn_add ${
              selectValue.length !== 0 && 'kzui-clickable kzui-add_btn_hover'
            }`}
            onClick={() => onChangeHandler(selectValue)}
          >
            Add
          </button>
        ) : (
          <button
            type='submit'
            disabled={!selectValue}
            className={`kzui-btn_add ${
              selectValue && 'kzui-clickable kzui-add_btn_hover'
            }`}
            onClick={() => onChangeHandler(selectValue)}
          >
            Add
          </button>
        )}
        <div className='kzui-margin_top kzui-menu_box'>
          <button onClick={() => onMenuOpen()} className='kzui-menu_button'>
            Menu
          </button>
        </div>
      </div>
      {/* added data */}
      <div className='kzui-added_list'>
        <h4>My added list</h4>
        <div>
          {isMulti ? (
            <>
              {allSelectedData.length > 0 &&
                allSelectedData.map((singleData, ind) => (
                  <div key={singleData.id} className='kzui-added_list_div'>
                    <p>{ind + 1}.</p>
                    <ul>
                      {singleData.data.map((sinData) => (
                        <li key={sinData.name + 1221}>{sinData.name} </li>
                      ))}
                    </ul>
                    <button
                      className='kzui-delete_button'
                      onClick={() => handleDelete(singleData.id)}
                    >
                      Delete
                    </button>
                  </div>
                ))}
            </>
          ) : (
            <>
              {allSelectedData.length > 0 &&
                allSelectedData.map((singleData, ind) => (
                  <div key={singleData.id} className='kzui-added_list_div'>
                    <p>
                      {ind + 1}. {singleData.name}{' '}
                    </p>
                    <button
                      className='kzui-delete_button'
                      onClick={() => handleDelete(singleData.id)}
                    >
                      Delete
                    </button>
                  </div>
                ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomSelect;
