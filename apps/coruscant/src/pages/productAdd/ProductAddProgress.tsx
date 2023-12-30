import React, { Fragment } from 'react';
import styled from 'styled-components';
import { FaCheck } from 'react-icons/fa';

interface ProgressComponentProps {
  stages: {
    name: string;
    displayName: string;
    index: number;
  }[];
  pageIndex: number;
  setPageIndex: (page: number) => void;
  percentage: number;
}

export const ProgressComponent: React.FC<ProgressComponentProps> = ({
  stages,
  pageIndex,
  setPageIndex,
  percentage,
}) => {
  const navigateTo = (newPage: number) => {
    setPageIndex(newPage);
  };

  return (
    <ProgressContainer>
      {stages.map((stage, index) => (
        <Fragment key={stage.name}>
          <InnerContainer>
            <Circle
              active={index === stage.index}
              completed={false}
              onClick={() => navigateTo(index)}
            >
              <InnerCircle active={index === stage.index}>
                {/* {stages.findIndex((s) => s.name === page) > index && (
                  <FaCheck color="d3d3d3" />
                )} */}
              </InnerCircle>
            </Circle>
            {/* <StageName>{stage.displayName}</StageName> */}
          </InnerContainer>
          {index < stages.length - 1 && <Line />}
        </Fragment>
      ))}
    </ProgressContainer>
  );
};

const ProgressContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  margin: 20px;
  background-color: lightgrey;
  padding: 5px;
  border-radius: 50px;
`;

const InnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center; // Align items in the center along the cross axis
`;

// const StageName = styled.div`
//   margin-top: 10px; // Add a top margin to push the stage name down
//   text-align: center; // Center the text
// `;

const Circle = styled.div<{ active?: boolean; completed?: boolean }>`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 3px solid #000;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  color: '#000';
  background: transparent;
  z-index: 1;
`;

const InnerCircle = styled.div<{ active?: boolean; completed?: boolean }>`
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: 3px solid;
  border-color: ${(props) => (props.active ? '#d3d3d3' : 'transparent')};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  z-index: 1;
`;

const Line = styled.div`
  flex-grow: 1;
  height: 4px;
  background: #000;
  margin: 0 -2px; // Adjust the margin to make the line touch the edge of the circle
  z-index: 0;
`;
