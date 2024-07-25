import React, { useState } from 'react';
import './CustomSelect.css';

const CustomSelect = ({
  formType,
  isClearable,
  isSearchable,
  isDisabled,
  isDisabledMulti,
  options,
  value,
  placeholder,
  isMulti,
  onChangeHandler,
  onSearchHandler,
  allSelectedData,
  selectValue,
  setSelectValue,
  handleDelete,
  onMenuOpen,
}) => {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
    onSearchHandler(event);
  };

  const handleSelectOption = (option) => {
    if (isMulti) {
      setSelectValue((prev) => {
        const alreadySelected = prev.find((item) => item.name === option);
        if (alreadySelected) return prev.filter((item) => item.name !== option);
        return [...prev, { name: option }];
      });
    } else {
      setSelectValue(option);
    }
    setInputValue('');
  };

  const handleRemoveOption = (option) => {
    if (isMulti) {
      setSelectValue((prev) => prev.filter((item) => item.name !== option));
    } else {
      setSelectValue('');
    }
  };

  return (
    <>
      <div className='kzui-main_container'>
        <div className='kzui-left_container'>
          <h4>{formType}</h4>
          <div>
            <h4>
              {isMulti
                ? 'Select your favorite universities'
                : 'Select your favorite university'}
            </h4>
            <div className='kzui-input_container'>
              <div className='kzui-search_box_container'>
                {isMulti &&
                  selectValue.map((item, index) => (
                    <div key={index} className='kzui-multi_value'>
                      {item.name}
                      <button
                        type='button'
                        className={`kzui-remove_button kzui-clickable`}
                        onClick={() => handleRemoveOption(item.name)}
                      >
                        &times;
                      </button>
                    </div>
                  ))}
                {!isMulti && selectValue && (
                  <div className='kzui-single_value'>
                    {selectValue}
                    <button
                      type='button'
                      className='kzui-remove_button kzui-clickable'
                      onClick={() => handleRemoveOption(selectValue)}
                    >
                      &times;
                    </button>
                  </div>
                )}
                <input
                  type='text'
                  className='kzui-search_box'
                  value={inputValue}
                  placeholder={
                    isMulti
                      ? selectValue.length === 0 && placeholder
                      : !selectValue && placeholder
                  }
                  onChange={handleInputChange}
                  disabled={isMulti ? isDisabledMulti : isDisabled}
                />
                {isClearable && (
                  <button
                    className={`kzui-button_clear ${
                      isMulti
                        ? value.length !== 0 &&
                          'kzui-clickable kzui-btn_clear_hover'
                        : value && 'kzui-clickable kzui-btn_clear_hover'
                    }`}
                    onClick={() => {
                      setInputValue('');
                      if (isMulti) setSelectValue([]);
                      else setSelectValue('');
                    }}
                    disabled={isMulti ? value.length === 0 : !value}
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>
            <div className='kzui-options_container'>
              {options
                .filter((option) =>
                  isSearchable
                    ? option.toLowerCase().includes(inputValue.toLowerCase())
                    : true
                )
                .filter(
                  (option) =>
                    !isMulti ||
                    !selectValue.some((item) => item.name === option)
                )
                .map((option, index) => (
                  <div
                    key={index}
                    className='kzui-option kzui-clickable'
                    onClick={() => handleSelectOption(option)}
                  >
                    {option}
                  </div>
                ))}
            </div>
          </div>
          <button
            type='submit'
            className={`kzui-btn_add ${
              isMulti?(selectValue.length!==0 && 'kzui-clickable kzui-add_btn_hover') : (selectValue && 'kzui-clickable kzui-add_btn_hover')
            }`}
            onClick={() => onChangeHandler(selectValue)}
            disabled={isMulti ? isDisabledMulti : isDisabled}
          >
            Add
          </button>
        </div>
        <div className='kzui-added_list'>
          <h4>My added list</h4>
          {allSelectedData.map((singleData, index) => (
            <div key={index} className='kzui-added_list_div kzui-display_flex '>
              <p>{index + 1}. </p>
              {isMulti ? (
                <ul>
                  {singleData.data.map((item) => (
                    <li key={item.name}>{item.name}</li>
                  ))}
                </ul>
              ) : (
                <p>{singleData.name}</p>
              )}
              <button
                className='kzui-delete_button'
                onClick={() => handleDelete(singleData.id)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
      <div className='kzui-margin_top kzui-menu_box'>
        <button onClick={() => onMenuOpen()} className='kzui-menu_button'>
          Menu
        </button>
      </div>
    </>
  );
};

export default CustomSelect;
