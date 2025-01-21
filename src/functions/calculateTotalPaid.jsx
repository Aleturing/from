const calculateTotalPaid = (paid) => { 
    return paid.reduce((total, element) => {
      return total + Number(element.mnt);  
    }, 0);
  };
  export default calculateTotalPaid;
  
