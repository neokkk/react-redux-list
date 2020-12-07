import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import UnfoldMoreIcon from '@material-ui/icons/UnfoldMore';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import { removeInfo, saveOrder } from '../../store';
import './index.scss';

export default function Table({ header }) {
    const [hoverCountryName, setHoverCountryName] = useState('');
    const dispatch = useDispatch();
    const { currentInfoList, orderList } = useSelector(state => state);

    const handleClickFilter = key => {
        const lastIdx = orderList.length - 1;

        if (lastIdx < 0
            || (orderList[lastIdx].key === key && orderList[lastIdx].order === 'desc')
            || orderList[lastIdx].key !== key) {
            dispatch(saveOrder(key, 'asc'));
        } else {
            dispatch(saveOrder(key, 'desc'));
        }
    }

    const handleClickRemove = name => {
        const confirm = window.confirm('Are you sure you want to remove this country information?');

        if (confirm) {
            dispatch(removeInfo(name));
        }
    }

    return (
        <table>
            <thead>
                <tr>
                    {header.map((info, idx) => (
                        <td className={`td_col_${idx}`} key={`thead_td_${idx}`} onClick={() => handleClickFilter(info.key)}>
                            <div className="td_wrap">
                                <span>{info.name.toUpperCase()}</span>
                                <UnfoldMoreIcon fontSize="small" />
                            </div>
                        </td>
                    ))}
                    <td className="td_col_5"></td>
                </tr>
            </thead>

            <tbody>
                {currentInfoList.length > 0 && currentInfoList.map((data, index) => (
                    <tr key={`tbody_tr_${index}`}
                        onClick={() => handleClickRemove(data.name)}
                        onMouseOver={() => setHoverCountryName(data.name)}
                        onMouseLeave={() => setHoverCountryName('')}>
                        {Object.values(data).map((val, idx) => (
                            <td className={`td_col_${idx}`} key={`tbody_td_${idx}`}>
                                <span>{val}</span>
                            </td>
                        ))}

                        <td className="td_col_5">
                            <div className={`td_wrap ${hoverCountryName === data.name ? 'hovered' : 'unhovered'}`}>
                                <DeleteOutlineIcon fontSize="small" />
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}