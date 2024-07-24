import './App.css';
import CustomSelect from './components/CustomSelect';
import {  useState } from 'react';

function App() {
  const options = ['Duet', 'Buet', 'Kuet', 'Cuet', 'Ruet'];

  const [isDisabledSingle, setIsDisabledSingle] = useState(false);
  const [isDisabledMulti, setIsDisabledMulti] = useState(false);
  const [searchSingleValue, setSearchSingleValue] = useState('');
  const [searchMultiValue, setSearchMultiValue] = useState('');
  const [allSingleData, setAllSingleData] = useState([]);
  const [selectSingleValue, setSelectSingleValue] = useState('');
  const [storeAllMultiData, setStoreAllMultiData] = useState([]);
  const [selectMultiValue, setSelectMultiValue] = useState([]);

  const handleSearch = (e) => {
    setSearchSingleValue(e.target.value);
  };
  const handleMultiSearch = (e) => {
    setSearchMultiValue(e.target.value);
  };

  const handleClearSingleForm = (searchText) => {
    setSearchSingleValue('');
  };
  const handleClearMultiForm = (searchText) => {
    setSearchMultiValue('');
  };

  const handleSingleMenuOpen = () => {
    console.log('Single Menu is open');
  };
  const handleMultiMenuOpen = () => {
    console.log('Multi Menu is open');
  };

  // check id
  const isIdUnique = (id, data) => data.some((single) => single.id === id);
  // generate unique id
  const generateUniqueId = (data, maxNum = 6) => {
    for (let i = 0; i < maxNum; i++) {
      const potentialId = `${Math.random()
        .toString(2)
        .substr(2, 3)}_${Date.now()}`;
      if (!isIdUnique(potentialId, data)) {
        return potentialId;
      }
    }
    return null;
  };

  // handle added single list
  const handleAddedSingleList = (data) => {
    const uniqueId = generateUniqueId(allSingleData);
    const myData = {
      id: uniqueId,
      name: data,
    };
    setAllSingleData([myData, ...allSingleData]);
  };
  // handle selected multiple/group value
  const handleMultipleValue = ({ type, name }) => {
    if (type) {
      const restData = selectMultiValue.filter((sv) => sv.name !== name);

      if (restData.length > 0) {
        setSelectMultiValue([{ type, name }, ...restData]);
      } else if (selectMultiValue.length > 0) {
        setSelectMultiValue([{ type, name }, ...selectMultiValue]);
      } else {
        setSelectMultiValue([{ type, name }]);
      }
    } else {
      const restData = selectMultiValue.filter((sv) => sv.name !== name);
      setSelectMultiValue(restData);
    }
  };

  // handle added multi list button
  const handleAddedMultiList = (data) => {
    if (selectMultiValue.length > 0) {
      const uniqueId = generateUniqueId(storeAllMultiData);
      const myData = { id: uniqueId, data: selectMultiValue };
      setStoreAllMultiData([myData, ...storeAllMultiData]);
    }
  };

  // handle single data deleted
  const handleDeleteSingle = (id) => {
    const restData = allSingleData.filter((singleData) => singleData.id !== id);
    setAllSingleData(restData);
  };

  // handle multi/group data deleted
  const handleDeleteMultiple = (id) => {
    const restData = storeAllMultiData.filter(
      (MultiData) => MultiData.id !== id
    );
    setStoreAllMultiData(restData);
  };

  return (
    <div className='App'>
      <h1 className='title'>Custom Selected Form </h1>
      {/* for single form */}
      <CustomSelect
        formType='Single Form'
        isClearable={handleClearSingleForm}
        isSearchable={true}
        isDisabled={isDisabledSingle}
        setIsDisabled={setIsDisabledSingle}
        options={options}
        value={searchSingleValue}
        setSearchValue={setSearchSingleValue}
        placeholder='Select a university'
        isGrouped={false}
        isMulti={false}
        onChangeHandler={handleAddedSingleList}
        onMenuOpen={handleSingleMenuOpen}
        onSearchHandler={handleSearch}
        allSelectedData={allSingleData}
        selectValue={selectSingleValue}
        setSelectValue={setSelectSingleValue}
        handleDelete={handleDeleteSingle}
      />

      <div style={{ marginTop: '50px' }}></div>

      {/* for Multi form */}
      <CustomSelect
        formType='Multi Form'
        isClearable={handleClearMultiForm}
        isSearchable={true}
        isDisabled={isDisabledMulti}
        setIsDisabled={setIsDisabledMulti}
        options={options}
        value={searchMultiValue}
        setSearchValue={setSearchMultiValue}
        placeholder='Select a university'
        isGrouped={true}
        isMulti={true}
        onChangeHandler={handleAddedMultiList}
        onMenuOpen={handleMultiMenuOpen}
        onSearchHandler={handleMultiSearch}
        allSelectedData={storeAllMultiData}
        selectValue={selectMultiValue}
        setSelectValue={handleMultipleValue}
        handleDelete={handleDeleteMultiple}
      />
    </div>
  );
}

export default App;
