import { BiSad } from 'react-icons/bi';

// const StyledNotFound = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   flex-direction: column;
//   margin: 5rem;
//   padding: 1rem;
//   .not-found-content {
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     flex-direction: column;
//     margin: 5rem;
//     padding: 3rem;
//     border-radius: 10px;
//     background: ${({ theme }) => theme.clear};
//     color: ${({ theme }) => theme.textPrimary};
//   }
// `;

const NotFound = () => {
  return (
    <div className="not-found-content">
      <BiSad size={120} />
      404 Page Not Found
    </div>
  );
};

export default NotFound;
