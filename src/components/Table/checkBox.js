import React from "react";
import {SelectedRows} from "../../services/invoiceService"

const IndeterminateCheckbox = React.forwardRef(
    ({ indeterminate, ...rest }, ref) => {
      const defaultRef = React.useRef();
      const resolvedRef = ref || defaultRef;
      if (rest.props && resolvedRef.current)
      {
        resolvedRef.current.invoiceNumber = rest.props.original.invoiceNumber;
        resolvedRef.current.checked = SelectedRows.includes(rest.props.original.invoiceNumber);
      }
      const handleChange = (row) => 
      {
            if (!row.currentTarget.checked) {
              const keyIndex = SelectedRows.indexOf(row.currentTarget.invoiceNumber);
              SelectedRows = [
                ...SelectedRows.slice(0, keyIndex),
                ...SelectedRows.slice(keyIndex + 1)
              ];
            } else {
              SelectedRows.push(row.currentTarget.invoiceNumber);
            }
       }
      return (
        <>
          <input type="checkbox" onChange={handleChange} ref={resolvedRef} {...rest} />
        </>
      )
    }
  )

  export default IndeterminateCheckbox;