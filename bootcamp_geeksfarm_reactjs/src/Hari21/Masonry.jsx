import React, { Component } from "react";
import "./style/Masonry.css";

class MasonryResult extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: 3,
    };
    this.imageRefs = [];
  }

  componentDidMount() {
    this.calculateLayout();
    window.addEventListener("resize", this.calculateLayout);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.calculateLayout);
  }

  calculateLayout = () => {
    const containerWidth = this.containerRef.offsetWidth;
    const columnCount = Math.floor(containerWidth / 250);
    this.setState({ columns: columnCount });
  };

  addImageRef = (ref) => {
    if (ref && !this.imageRefs.includes(ref)) {
      this.imageRefs.push(ref);
    }
  };

  render() {
    const { images } = this.props;
    const columns = Array.from({ length: this.state.columns }, () => []);

    images.forEach((image, index) => {
      const column = index % this.state.columns;
      columns[column].push(
        <div key={image.id} className="masonry-item" ref={this.addImageRef}>
          <img src={image.urls.small} alt={image.alt_description} />
          <p>{image.alt_description}</p>
        </div>
      );
    });

    return (
      <div className="masonry-gallery" ref={(ref) => (this.containerRef = ref)}>
        {columns.map((columnImages, columnIndex) => (
          <div key={columnIndex} className="masonry-column">
            {columnImages}
          </div>
        ))}
      </div>
    );
  }
}

export default MasonryResult;
