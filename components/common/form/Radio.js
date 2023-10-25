// const Radio = ({ props }) => {
//   const { label, id, name, click, checked } = props;
//   return (
//     <div className="pb-3" onClick={() => click(id)}>
//       <div className="">
//         <input type="Radio" name={name} id={id} checked={checked} />
//         <label htmlFor={id} className="ps-3">
//           {label}
//         </label>
//       </div>
//     </div>
//   );
// };
//
// export default Radio;

const Radio = ({ props, optionLabel, name, optionvalue, checked, onChange, required=false }) => {
    return (
        <div className="pb-3">
            <div className="">
                {props.map((option, index) => {
                   return (
                        <span className={'me-2'} key={option[optionvalue]}>
                            <input onChange={onChange}
                                   type="radio"
                                   name={name}
                                   required={required}
                                   id={option[optionvalue]}
                                   value={option[optionvalue]}
                                   checked={option[optionvalue] == checked} />
                                <label htmlFor={option[optionvalue]} className="ps-1">
                                    {option['label']}
                                </label>
                        </span>
                    )
                })}
            </div>
        </div>
    );
};

export default Radio;
