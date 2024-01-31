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
        <InnerContainer>
          <Circle
            active={index === stage.index}
            completed={false}
            onClick={() => navigateTo(index)}
          />
          <StageName>{stage.displayName}</StageName>
        </InnerContainer>
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
  justify-content: space-between;
`;

const InnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StageName = styled.div`
  margin-top: 10px;
  text-align: center;
  position: absolute;
  top: 35px;
`;

const Circle = styled.div<{ active?: boolean; completed?: boolean }>`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 2px solid;
  border-color: ${(props) =>
    props.active ? 'black' : props.completed ? 'green' : 'lightgrey'};
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  z-index: 1;
`;
