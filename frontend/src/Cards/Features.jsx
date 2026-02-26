import React from "react";
import inventoryFeatures from './FeatureData.jsx';
import '../Styles/Home.css';

const Features = () => {
  return (
    <div className="features">
      {inventoryFeatures.map((item, index) => {
        return (
          <div  className='feature-card' key={index}>
            <h3>{item.icon}</h3>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Features;
