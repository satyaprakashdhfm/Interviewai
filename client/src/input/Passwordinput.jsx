import React, { useState } from 'react';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6';

const Passwordinput = ({ value, onChange, placeholder }) => {
  const [isShowPassword, setIsShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setIsShowPassword(!isShowPassword);
  };

  return (
    <div className="p-[2px] bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg mb-4">
      <div className="flex items-center bg-white px-5 py-3 rounded-lg">
        <input
          value={value}
          onChange={onChange}
          placeholder={placeholder || 'Password'}
          type={isShowPassword ? 'text' : 'password'}
          className="w-full text-sm bg-transparent mr-3 outline-none"
        />
        {isShowPassword ? (
          <FaRegEye
            size={22}
            className="text-primary cursor-pointer"
            onClick={toggleShowPassword}
          />
        ) : (
          <FaRegEyeSlash
            size={22}
            className="text-slate-400 cursor-pointer"
            onClick={toggleShowPassword}
          />
        )}
      </div>
    </div>
  );
};

export default Passwordinput;
