import { Skeleton, Avatar, Row, Col } from "antd";

export const CardSkeleton = () => {
  return (
    <div
      style={{
        display: "flex",
        backgroundColor: '#79C7D9',
        border: '1px solid #2BB9D9',
        padding: "16px",
        borderRadius: "12px",
        marginBottom: "16px",
        alignItems: "center",
      }}
    >
      <Col span={4}>
        <Skeleton.Avatar shape="square" size={150} active />
      </Col>

      <Col span={19} offset={1}>
        <Row>
          <Skeleton.Input
            style={{ width: "100%", marginBottom: 12 }}
            active
            size="default"
          />
        </Row>
        <Row justify='space-between' >
          <Skeleton.Input
            style={{ width: "80%", marginBottom: 8 }}
            active
            size="small"
          />
          <Skeleton.Input
            style={{ width: "80%", marginBottom: 8 }}
            active
            size="small"
          />
        </Row>
        <Row justify='space-between' >
          <Skeleton.Input
            style={{ width: "80%", marginBottom: 8 }}
            active
            size="small"
          />
          <Skeleton.Input
            style={{ width: "80%", marginBottom: 8 }}
            active
            size="small"
          />
        </Row>
        <Row justify='space-between' >
          <Skeleton.Input
            style={{ width: "80%", marginBottom: 8 }}
            active
            size="small"
          />
          <Skeleton.Input
            style={{ width: "80%", marginBottom: 8 }}
            active
            size="small"
          />
        </Row>
      </Col>
    </div>
  );
};
