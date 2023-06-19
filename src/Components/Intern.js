import React, { useState } from 'react';
import './css/Intern.css';
import { data } from './Data.js';

const Intern = () => {
    const [search, setSearch] = useState('');
    const [officeChecked, setOfficeChecked] = useState(true);
    const [remoteChecked, setRemoteChecked] = useState(true);
    const [hybridChecked, setHybridChecked] = useState(true);
    const [salaryRange, setSalaryRange] = useState(0);

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
    };

    const handleFilterChange = (e) => {
        const filterType = e.target.getAttribute('data-type');
        const checked = e.target.checked;

        switch (filterType) {
            case 'office':
                setOfficeChecked(checked);
                break;
            case 'remote':
                setRemoteChecked(checked);
                break;
            case 'hybrid':
                setHybridChecked(checked);
                break;
            default:
                break;
        }
    };

    const filteredIntern = data.filter((item) => {
        return (
            (item.mode === 'In-Office' && officeChecked) ||
            (item.mode === 'Online' && remoteChecked) ||
            (item.mode === 'Hybrid' && hybridChecked)
        );
    }).filter((item) => {
        return search === '' || item.intern_name.toLowerCase().includes(search.toLowerCase());
    });

    const handleSalaryChange = (e) => {
        setSalaryRange(e.target.value);
    };

    return (
        <>
            <div className='searchBar-wrap'>
                <input
                    type='text'
                    placeholder='Search'
                    value={search}
                    onChange={handleSearchChange}
                />
            </div>
            <div className='main'>
                <div className='filters'>
                    <div className='toggle-switch'>
                        <input
                            type='checkbox'
                            id='office'
                            className='toggle-input'
                            data-type='office'
                            checked={officeChecked}
                            onChange={handleFilterChange}
                        />
                        <label htmlFor='office' className='toggle-label'>
                            In Office
                        </label>
                        <input
                            type='checkbox'
                            id='remote'
                            className='toggle-input'
                            data-type='remote'
                            checked={remoteChecked}
                            onChange={handleFilterChange}
                        />
                        <label htmlFor='remote' className='toggle-label'>
                            Online
                        </label>
                        <input
                            type='checkbox'
                            id='hybrid'
                            className='toggle-input'
                            data-type='hybrid'
                            checked={hybridChecked}
                            onChange={handleFilterChange}
                        />
                        <label htmlFor='hybrid' className='toggle-label'>
                            Hybrid
                        </label>
                    </div>
                    <h2>Salary</h2>
                    <br />
                    <div className='range-slider'>
                        <input
                            type='range'
                            id='salary'
                            min='0'
                            max='1000000'
                            step='10000'
                            value={salaryRange}
                            onChange={handleSalaryChange}
                        />
                        <label htmlFor='salary'>
                            Salary Range: <span id='salary-value'>{salaryRange} INR</span> -{' '}
                            <span id='salary-max'>10,00,000 INR</span>
                        </label>
                    </div>
                </div>

                <div className='main-cards'>
                    {filteredIntern.map((item) => (
                        <div className='cards' key={item.id}>
                            <div className='intern-card'>
                                <div className='intern-head'>
                                    <img
                                        className='intern-img'
                                        src='https://source.unsplash.com/random/80x80/?wallpaper,landscape'
                                        alt='Avatar'
                                    />

                                    <div>
                                        <h2 className='intern-title'>{item.intern_name}</h2>
                                        <div className='intern-details'>
                                            <div className='intern-extra'>
                                                <h4 className='intern-mode'>{item.mode}</h4>
                                                <h4 className='intern-loc'>{item.location}</h4>
                                            </div>
                                            <hr />
                                            <div className='intern-extra'>
                                                <h4 className='intern-post'>{item.posted}</h4>
                                                <h4 className='intern-com'>{item.company}</h4>
                                            </div>
                                            <hr />
                                            <div className='intern-extra'>
                                                <h4 className='intern-com'>{item.stipend}</h4>
                                                <h4 className='intern-com'>{item.openings}</h4>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='buttons'>
                                    <button>View Job</button>
                                    <button>Apply</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Intern;
