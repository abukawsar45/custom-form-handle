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
              <div>
                {' '}
                {isMulti ? (
                  <h4>Select your all favorites university</h4>
                ) : (
                  <h4>Select your favorite university</h4>
                )}
              </div>
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
              {isMulti ? (
                <button
                  className={`kzui-btn_clear ${
                    value && 'kzui-clickable kzui-btn_clear_hover'
                  }`}
                  onClick={isClearable}
                  disabled={!value}
                >
                  Clear
                </button>
              ) : (
                <button
                  className={`kzui-btn_clear ${
                    value && 'kzui-clickable kzui-btn_clear_hover'
                  }`}
                  onClick={isClearable}
                  disabled={!value}
                >
                  Clear
                </button>
              )}
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
                          <div
                            className={`kzui-display_flex ${
                              value.toLowerCase() === option.toLowerCase()
                                ? 'kzui-selected_text'
                                : ''
                            } `}
                            key={option + ind + 'abab'}
                            onChange={(e) =>
                              !isDisabled &&
                              setSelectValue({
                                type: e.target.checked,
                                name: option,
                              })
                            }
                          >
                            <Input
                              className='kzui-checkbox_custom  '
                              type='checkbox'
                              name='university_name'
                              id={option + ind}
                              htmlFor={option + ind}
                              label={option}
                              disabled={isDisabled}
                            />
                          </div>
                        ) : (
                          <div
                            className={`kzui-display_flex ${
                              value.toLowerCase() === option.toLowerCase()
                                ? 'kzui-selected_text'
                                : ''
                            } `}
                            key={option + ind + 'ab'}
                            onChange={(e) =>
                              !isDisabled && setSelectValue(option)
                            }
                          >
                            <Input
                              className='kzui-checkbox_custom'
                              type='radio'
                              name='uni_name'
                              id={option}
                              htmlFor={option}
                              label={option}
                              disabled={isDisabled}
                            />
                          </div>
                        )}
                      </div>
                    ))}
                </div>
              }
            </div>
            <div className='kz'>
              {' '}
              {isMulti ? (
                <button
                  type='submit'
                  disabled={isDisabled}
                  className={`kzui-btn_add ${
                    !isDisabled &&
                    selectValue.length !== 0 &&
                    'kzui-clickable kzui-add_btn_hover'
                  }`}
                  onClick={() => onChangeHandler(selectValue)}
                >
                  Add
                </button>
              ) : (
                <button
                  type='submit'
                  disabled={isDisabled}
                  className={`kzui-btn_add ${
                    !isDisabled &&
                    selectValue &&
                    'kzui-clickable kzui-add_btn_hover'
                  }`}
                  onClick={() => onChangeHandler(selectValue)}
                >
                  Add
                </button>
              )}
            </div>
            <div className='kzui-display_flex '>
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
