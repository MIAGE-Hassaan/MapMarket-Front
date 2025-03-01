import * as React from "react";
import "../styles/Map.css";

const SvgMap = (props) => {
  const [showModal, setShowModal] = React.useState(false);
  const [modalPosition, setModalPosition] = React.useState({ x: 0, y: 0 });
  const [stockInfo, setStockInfo] = React.useState("");

  const handleCircleClick = (event, stock) => {
    const rect = event.target.getBoundingClientRect();
    setModalPosition({ x: rect.left, y: rect.top });
    setStockInfo(stock);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        id="map_svg__e8sDPRUS0jg1"
        shapeRendering="geometricPrecision"
        textRendering="geometricPrecision"
        viewBox="0 0 1920 1080"
        {...props}
      >
        <g transform="translate(893.427 566.152)">
          <rect
            width={682.012}
            height={560.962}
            fill="none"
            stroke="#ce6700"
            strokeWidth={2}
            paintOrder="stroke fill markers"
            rx={4}
            ry={4}
            transform="matrix(1.14405 0 0 .6903 51.278 70.722)"
          />
          <g transform="translate(384.758 -12.816)">
            <rect
              width={117.995}
              height={126.132}
              fill="#e4e4e4"
              rx={2}
              ry={2}
              transform="matrix(.34144 0 0 2.30019 355.352 132.157)"
            />
            <text
              strokeWidth={0}
              dx={0}
              dy={0}
              fontFamily='"e8sDPRUS0jg1:::Open Sans"'
              fontSize={30}
              fontWeight={400}
              transform="translate(356.918 170.665)"
            >
              <tspan y={0} />25
            </text>
            <rect
              width={28.673}
              height={53.488}
              fill="#d2dbed"
              strokeWidth={0}
              rx={0}
              ry={0}
              transform="matrix(1.4051 0 0 1 355.352 323.728)"
            />
            <rect
              width={28.673}
              height={53.488}
              fill="#d2dbed"
              strokeWidth={0}
              rx={0}
              ry={0}
              transform="matrix(1.4051 0 0 1 355.352 260.728)"
            />
            <rect
              width={28.673}
              height={53.488}
              fill="#d2dbed"
              strokeWidth={0}
              rx={0}
              ry={0}
              transform="matrix(1.4051 0 0 1 355.352 198.728)"
            />
            <circle
              cx={375}
              cy={225}
              r={10}
              fill="red"
              onClick={(e) => handleCircleClick(e, "12")}
              style={{ cursor: 'pointer' }}
            />
          </g>
          <g transform="rotate(90 282.468 429.945)">
            <rect
              width={117.995}
              height={126.132}
              fill="#e4e4e4"
              rx={2}
              ry={2}
              transform="rotate(135 54.085 226.273)scale(.34144 1.674)"
            />
            <text
              strokeWidth={0}
              dx={0}
              dy={0}
              fontFamily='"e8sDPRUS0jg1:::Open Sans"'
              fontSize={30}
              fontWeight={400}
              transform="rotate(-90 179.525 64.844)"
            >
              <tspan y={0} />24
              <tspan x={0} y={60} />
            </text>
            <rect
              width={28.673}
              height={53.488}
              fill="#d2dbed"
              strokeWidth={0}
              rx={0}
              ry={0}
              transform="rotate(135 47.422 210.42)scale(1.40509 1)"
            />
            <rect
              width={28.673}
              height={53.488}
              fill="#d2dbed"
              strokeWidth={0}
              rx={0}
              ry={0}
              transform="rotate(135 32.22 173.487)scale(1.40509 1)"
            />
            <circle
              cx={145}
              cy={270}
              r={10}
              fill="red"
              onClick={(e) => handleCircleClick(e, "2")}
              style={{ cursor: 'pointer' }}
            />
          </g>
          <g transform="rotate(90 338.82 377.59)">
            <rect
              width={117.995}
              height={126.132}
              fill="#e4e4e4"
              rx={2}
              ry={2}
              transform="rotate(135 54.085 226.273)scale(.34144 1.674)"
            />
            <text
              strokeWidth={0}
              dx={0}
              dy={0}
              fontFamily='"e8sDPRUS0jg1:::Open Sans"'
              fontSize={30}
              fontWeight={400}
              transform="rotate(-90 179.525 64.844)"
            >
              <tspan y={0} />23
              <tspan x={0} y={30} />
            </text>
            <rect
              width={28.673}
              height={53.488}
              fill="#d2dbed"
              strokeWidth={0}
              rx={0}
              ry={0}
              transform="rotate(135 47.422 210.42)scale(1.40509 1)"
            />
            <rect
              width={28.673}
              height={53.488}
              fill="#d2dbed"
              strokeWidth={0}
              rx={0}
              ry={0}
              transform="rotate(135 32.22 173.487)scale(1.40509 1)"
            />
          </g>
          <g transform="translate(21.435 13.777)">
            <rect
              width={117.995}
              height={126.132}
              fill="#e4e4e4"
              rx={2}
              ry={2}
              transform="rotate(135 54.085 226.273)scale(.34144 1.674)"
            />
            <text
              strokeWidth={0}
              dx={0}
              dy={0}
              fontFamily='"e8sDPRUS0jg1:::Open Sans"'
              fontSize={30}
              fontWeight={400}
              transform="translate(87.45 238.796)"
            >
              <tspan y={0} />22
            </text>
            <rect
              width={28.673}
              height={53.488}
              fill="#d2dbed"
              strokeWidth={0}
              rx={0}
              ry={0}
              transform="rotate(135 47.422 210.42)scale(1.40509 1)"
            />
            <rect
              width={28.673}
              height={53.488}
              fill="#d2dbed"
              strokeWidth={0}
              rx={0}
              ry={0}
              transform="rotate(135 32.22 173.487)scale(1.40509 1)"
            />
          </g>
          <g transform="translate(26.102 -92.046)">
            <rect
              width={117.995}
              height={126.132}
              fill="#e4e4e4"
              rx={2}
              ry={2}
              transform="rotate(135 54.085 226.273)scale(.34144 1.674)"
            />
            <text
              strokeWidth={0}
              dx={0}
              dy={0}
              fontFamily='"e8sDPRUS0jg1:::Open Sans"'
              fontSize={30}
              fontWeight={400}
              transform="translate(87.45 238.796)"
            >
              <tspan y={0} />21
            </text>
            <rect
              width={28.673}
              height={53.488}
              fill="#d2dbed"
              strokeWidth={0}
              rx={0}
              ry={0}
              transform="rotate(135 47.422 210.42)scale(1.40509 1)"
            />
            <rect
              width={28.673}
              height={53.488}
              fill="#d2dbed"
              strokeWidth={0}
              rx={0}
              ry={0}
              transform="rotate(135 32.22 173.487)scale(1.40509 1)"
            />
          </g>
          <text
            fill="#ce6700"
            strokeWidth={0}
            dx={0}
            dy={0}
            fontFamily='"e8sDPRUS0jg1:::Roboto"'
            fontSize={30}
            fontWeight={400}
            transform="translate(52.518 56.037)"
          >
            <tspan y={0} />Accueil et service
            <tspan x={0} y={30} />
          </text>
        </g>
        <g transform="translate(37 566.152)">
          <rect
            width={682.012}
            height={560.962}
            fill="none"
            stroke="#d2c100"
            strokeWidth={2}
            paintOrder="stroke fill markers"
            rx={4}
            ry={4}
            transform="matrix(.54804 0 0 .6903 482.447 70.722)"
          />
          <text
            fill="#d2c100"
            strokeWidth={0}
            dx={0}
            dy={0}
            fontFamily='"e8sDPRUS0jg1:::Roboto"'
            fontSize={30}
            fontWeight={400}
            transform="translate(482.929 56.44)"
          >
            <tspan y={0} />Conserve
          </text>
          <g transform="translate(150 163)">
            <rect
              width={117.995}
              height={126.132}
              fill="#e4e4e4"
              rx={2}
              ry={2}
              transform="matrix(1.1332 0 0 1.07567 553.636 119.34)"
            />
            <text
              strokeWidth={0}
              dx={0}
              dy={0}
              fontFamily='"e8sDPRUS0jg1:::Open Sans"'
              fontSize={30}
              fontWeight={400}
              transform="translate(558.78 245.222)"
            >
              <tspan y={0} />20
            </text>
            <rect
              width={28.673}
              height={53.488}
              fill="#d2dbed"
              strokeWidth={0}
              rx={0}
              ry={0}
              transform="matrix(1.4051 0 0 1 640.636 128.1)"
            />
            <rect
              width={28.673}
              height={53.488}
              fill="#d2dbed"
              strokeWidth={0}
              rx={0}
              ry={0}
              transform="matrix(1.4051 0 0 1 559.636 128.1)"
            />
          </g>
          <g transform="translate(150)">
            <rect
              width={117.995}
              height={126.132}
              fill="#e4e4e4"
              rx={2}
              ry={2}
              transform="matrix(1.1332 0 0 1.07567 553.636 119.34)"
            />
            <text
              strokeWidth={0}
              dx={0}
              dy={0}
              fontFamily='"e8sDPRUS0jg1:::Open Sans"'
              fontSize={30}
              fontWeight={400}
              transform="translate(558.78 151.222)"
            >
              <tspan y={0} />19
            </text>
            <rect
              width={28.673}
              height={53.488}
              fill="#d2dbed"
              strokeWidth={0}
              rx={0}
              ry={0}
              transform="matrix(1.4051 0 0 1 640.636 194.1)"
            />
            <rect
              width={28.673}
              height={53.488}
              fill="#d2dbed"
              strokeWidth={0}
              rx={0}
              ry={0}
              transform="matrix(1.4051 0 0 1 559.636 194.1)"
            />
          </g>
          <g transform="translate(63)">
            <rect
              width={117.995}
              height={126.132}
              fill="#e4e4e4"
              rx={2}
              ry={2}
              transform="matrix(.34144 0 0 2.30019 518.492 119.277)"
            />
            <text
              strokeWidth={0}
              dx={0}
              dy={0}
              fontFamily='"e8sDPRUS0jg1:::Open Sans"'
              fontSize={30}
              fontWeight={400}
              transform="translate(520.48 151.276)"
            >
              <tspan y={0} />18
            </text>
            <rect
              width={28.673}
              height={53.488}
              fill="#d2dbed"
              strokeWidth={0}
              rx={0}
              ry={0}
              transform="matrix(1.4051 0 0 1 518.492 322.422)"
            />
            <rect
              width={28.673}
              height={53.488}
              fill="#d2dbed"
              strokeWidth={0}
              rx={0}
              ry={0}
              transform="matrix(1.4051 0 0 1 518.492 257.728)"
            />
            <rect
              width={28.673}
              height={53.488}
              fill="#d2dbed"
              strokeWidth={0}
              rx={0}
              ry={0}
              transform="matrix(1.4051 0 0 1 518.492 192.228)"
            />
          </g>
          <rect
            width={117.995}
            height={126.132}
            fill="#e4e4e4"
            rx={2}
            ry={2}
            transform="matrix(.34144 0 0 2.30019 518.492 119.277)"
          />
          <text
            strokeWidth={0}
            dx={0}
            dy={0}
            fontFamily='"e8sDPRUS0jg1:::Open Sans"'
            fontSize={30}
            fontWeight={400}
            transform="translate(520.48 151.276)"
          >
            <tspan y={0} />17
          </text>
          <rect
            width={28.673}
            height={53.488}
            fill="#d2dbed"
            strokeWidth={0}
            rx={0}
            ry={0}
            transform="matrix(1.4051 0 0 1 518.492 322.422)"
          />
          <rect
            width={28.673}
            height={53.488}
            fill="#d2dbed"
            strokeWidth={0}
            rx={0}
            ry={0}
            transform="matrix(1.4051 0 0 1 518.492 257.728)"
          />
          <rect
            width={28.673}
            height={53.488}
            fill="#d2dbed"
            strokeWidth={0}
            rx={0}
            ry={0}
            transform="matrix(1.4051 0 0 1 518.492 192.228)"
          />
        </g>
        <g transform="translate(-394.247 563.77)">
          <g transform="rotate(-90 548.226 142.711)">
            <rect
              width={117.995}
              height={126.132}
              fill="#e4e4e4"
              rx={2}
              ry={2}
              transform="matrix(2.41737 0 0 1.92662 283.979 143.636)"
            />
            <rect
              width={28.673}
              height={53.488}
              fill="#d2dbed"
              strokeWidth={0}
              rx={0}
              ry={0}
              transform="matrix(1.4051 0 0 1 326.532 325.179)"
            />
            <rect
              width={28.673}
              height={53.488}
              fill="#d2dbed"
              strokeWidth={0}
              rx={0}
              ry={0}
              transform="matrix(1.4051 0 0 1 386.309 325.179)"
            />
            <rect
              width={28.673}
              height={53.488}
              fill="#d2dbed"
              strokeWidth={0}
              rx={0}
              ry={0}
              transform="matrix(1.4051 0 0 1 445.569 326.923)"
            />
            <rect
              width={28.673}
              height={53.488}
              fill="#d2dbed"
              strokeWidth={0}
              rx={0}
              ry={0}
              transform="matrix(1.4051 0 0 1 326.532 150.179)"
            />
            <rect
              width={28.673}
              height={53.488}
              fill="#d2dbed"
              strokeWidth={0}
              rx={0}
              ry={0}
              transform="matrix(1.4051 0 0 1 386.309 150.179)"
            />
            <rect
              width={28.673}
              height={53.488}
              fill="#d2dbed"
              strokeWidth={0}
              rx={0}
              ry={0}
              transform="matrix(1.4051 0 0 1 445.569 151.923)"
            />
            <text
              strokeWidth={0}
              dx={0}
              dy={0}
              fontFamily='"e8sDPRUS0jg1:::Open Sans"'
              fontSize={30}
              fontWeight={400}
              transform="rotate(90 187.632 338.977)"
            >
              <tspan y={0} />16
            </text>
          </g>
          <text
            fill="#ac014b"
            strokeWidth={0}
            dx={0}
            dy={0}
            fontFamily='"e8sDPRUS0jg1:::Roboto"'
            fontSize={30}
            fontWeight={400}
            transform="translate(482.929 56.44)"
          >
            <tspan y={0} />Fruits et légumes
          </text>
          <rect
            width={682.012}
            height={560.962}
            fill="none"
            stroke="#ac014b"
            strokeWidth={2}
            paintOrder="stroke fill markers"
            rx={4}
            ry={4}
            transform="matrix(.54804 0 0 .6903 482.447 70.722)"
          />
        </g>
        <g transform="translate(902 53)">
          <g transform="rotate(-90 792.556 387.041)">
            <rect
              width={117.995}
              height={126.132}
              fill="#e4e4e4"
              rx={2}
              ry={2}
              transform="matrix(.34144 0 0 2.30019 770.193 119.277)"
            />
            <text
              strokeWidth={0}
              dx={0}
              dy={0}
              fontFamily='"e8sDPRUS0jg1:::Open Sans"'
              fontSize={30}
              fontWeight={400}
              transform="rotate(90 328.906 450.183)"
            >
              <tspan y={0} />15
              <tspan x={0} y={60} />
            </text>
            <rect
              width={28.673}
              height={53.488}
              fill="#d2dbed"
              strokeWidth={0}
              rx={0}
              ry={0}
              transform="matrix(1.4051 0 0 1 770.492 322.422)"
            />
            <circle
              cx={790}
              cy={350}
              r={10}
              fill="red"
              onClick={(e) => handleCircleClick(e, "22")}
              style={{ cursor: 'pointer' }}
            />
            <rect
              width={28.673}
              height={53.488}
              fill="#d2dbed"
              strokeWidth={0}
              rx={0}
              ry={0}
              transform="matrix(1.4051 0 0 1 770.492 257.728)"
            />
            <rect
              width={28.673}
              height={53.488}
              fill="#d2dbed"
              strokeWidth={0}
              rx={0}
              ry={0}
              transform="matrix(1.4051 0 0 1 770.492 192.228)"
            />
          </g>
          <g transform="rotate(-90 712.814 307.822)">
            <rect
              width={117.995}
              height={126.132}
              fill="#e4e4e4"
              rx={2}
              ry={2}
              transform="matrix(.34144 0 0 2.30019 692.193 119.277)"
            />
            <text
              strokeWidth={0}
              dx={0}
              dy={0}
              fontFamily='"e8sDPRUS0jg1:::Open Sans"'
              fontSize={30}
              fontWeight={400}
              transform="rotate(90 289.293 411.093)"
            >
              <tspan y={0} />14
            </text>
            <rect
              width={28.673}
              height={53.488}
              fill="#d2dbed"
              strokeWidth={0}
              rx={0}
              ry={0}
              transform="matrix(1.4051 0 0 1 692.492 322.422)"
            />
            <circle
              cx={712}
              cy={350}
              r={10}
              fill="red"
              onClick={(e) => handleCircleClick(e, "3")}
              style={{ cursor: 'pointer' }}
            />
            <rect
              width={28.673}
              height={53.488}
              fill="#d2dbed"
              strokeWidth={0}
              rx={0}
              ry={0}
              transform="matrix(1.4051 0 0 1 692.492 257.728)"
            />
            <rect
              width={28.673}
              height={53.488}
              fill="#d2dbed"
              strokeWidth={0}
              rx={0}
              ry={0}
              transform="matrix(1.4051 0 0 1 692.492 192.228)"
            />
          </g>
          <g transform="rotate(-90 710.729 305.214)">
            <rect
              width={117.995}
              height={126.132}
              fill="#e4e4e4"
              rx={2}
              ry={2}
              transform="matrix(.34144 0 0 2.30019 770.193 119.277)"
            />
            <text
              strokeWidth={0}
              dx={0}
              dy={0}
              fontFamily='"e8sDPRUS0jg1:::Open Sans"'
              fontSize={30}
              fontWeight={400}
              transform="rotate(90 328.906 450.183)"
            >
              <tspan y={0} />13
              <tspan x={0} y={60} />
            </text>
            <rect
              width={28.673}
              height={53.488}
              fill="#d2dbed"
              strokeWidth={0}
              rx={0}
              ry={0}
              transform="matrix(1.4051 0 0 1 770.492 322.422)"
            />
            <rect
              width={28.673}
              height={53.488}
              fill="#d2dbed"
              strokeWidth={0}
              rx={0}
              ry={0}
              transform="matrix(1.4051 0 0 1 770.492 257.728)"
            />
            <rect
              width={28.673}
              height={53.488}
              fill="#d2dbed"
              strokeWidth={0}
              rx={0}
              ry={0}
              transform="matrix(1.4051 0 0 1 770.492 192.228)"
            />
          </g>
          <g transform="rotate(-90 548.226 142.711)">
            <rect
              width={117.995}
              height={126.132}
              fill="#e4e4e4"
              rx={2}
              ry={2}
              transform="matrix(.34144 0 0 2.30019 518.492 119.277)"
            />
            <rect
              width={28.673}
              height={53.488}
              fill="#d2dbed"
              strokeWidth={0}
              rx={0}
              ry={0}
              transform="matrix(1.4051 0 0 1 518.492 192.228)"
            />
            <rect
              width={28.673}
              height={53.488}
              fill="#d2dbed"
              strokeWidth={0}
              rx={0}
              ry={0}
              transform="matrix(1.4051 0 0 1 518.492 257.728)"
            />
            <circle
              cx={540}
              cy={285}
              r={10}
              fill="red"
              onClick={(e) => handleCircleClick(e, "19")}
              style={{ cursor: 'pointer' }}
            />
            <rect
              width={28.673}
              height={53.488}
              fill="#d2dbed"
              strokeWidth={0}
              rx={0}
              ry={0}
              transform="matrix(1.4051 0 0 1 518.492 322.422)"
            />
            <text
              strokeWidth={0}
              dx={0}
              dy={0}
              fontFamily='"e8sDPRUS0jg1:::Open Sans"'
              fontSize={30}
              fontWeight={400}
              transform="rotate(90 203.24 324.146)"
            >
              <tspan y={0} />12
            </text>
          </g>
          <text
            fill="#5800c5"
            strokeWidth={0}
            dx={0}
            dy={0}
            fontFamily='"e8sDPRUS0jg1:::Roboto"'
            fontSize={30}
            fontWeight={400}
            transform="translate(482.929 56.44)"
          >
            <tspan y={0} />Boisson
            <tspan x={0} y={60} />
          </text>
          <rect
            width={682.012}
            height={560.962}
            fill="none"
            stroke="#5800c5"
            strokeWidth={2}
            paintOrder="stroke fill markers"
            rx={4}
            ry={4}
            transform="matrix(.54804 0 0 .6903 482.447 70.722)"
          />
        </g>
        <g transform="translate(462 53)">
          <g transform="rotate(-90 712.814 307.822)">
            <rect
              width={117.995}
              height={126.132}
              fill="#e4e4e4"
              rx={2}
              ry={2}
              transform="matrix(.34144 0 0 2.30019 692.193 119.277)"
            />
            <text
              strokeWidth={0}
              dx={0}
              dy={0}
              fontFamily='"e8sDPRUS0jg1:::Open Sans"'
              fontSize={30}
              fontWeight={400}
              transform="rotate(90 289.293 411.093)"
            >
              <tspan y={0} />10
            </text>
            <rect
              width={28.673}
              height={53.488}
              fill="#d2dbed"
              strokeWidth={0}
              rx={0}
              ry={0}
              transform="matrix(1.4051 0 0 1 692.492 322.422)"
            />
            <rect
              width={28.673}
              height={53.488}
              fill="#d2dbed"
              strokeWidth={0}
              rx={0}
              ry={0}
              transform="matrix(1.4051 0 0 1 692.492 257.728)"
            />
            <rect
              width={28.673}
              height={53.488}
              fill="#d2dbed"
              strokeWidth={0}
              rx={0}
              ry={0}
              transform="matrix(1.4051 0 0 1 692.492 192.228)"
            />
          </g>
          <g transform="rotate(-90 548.226 142.711)">
            <rect
              width={117.995}
              height={126.132}
              fill="#e4e4e4"
              rx={2}
              ry={2}
              transform="matrix(.34144 0 0 2.30019 518.492 119.277)"
            />
            <rect
              width={28.673}
              height={53.488}
              fill="#d2dbed"
              strokeWidth={0}
              rx={0}
              ry={0}
              transform="matrix(1.4051 0 0 1 518.492 192.228)"
            />
            <rect
              width={28.673}
              height={53.488}
              fill="#d2dbed"
              strokeWidth={0}
              rx={0}
              ry={0}
              transform="matrix(1.4051 0 0 1 518.492 257.728)"
            />
            <rect
              width={28.673}
              height={53.488}
              fill="#d2dbed"
              strokeWidth={0}
              rx={0}
              ry={0}
              transform="matrix(1.4051 0 0 1 518.492 322.422)"
            />
            <text
              strokeWidth={0}
              dx={0}
              dy={0}
              fontFamily='"e8sDPRUS0jg1:::Open Sans"'
              fontSize={30}
              fontWeight={400}
              transform="rotate(90 203.24 324.146)"
            >
              <tspan y={0} />8
            </text>
          </g>
          <g transform="rotate(-90 627.45 222.458)">
            <rect
              width={117.995}
              height={126.132}
              fill="#e4e4e4"
              rx={2}
              ry={2}
              transform="matrix(.34144 0 0 2.30019 604.193 119.277)"
            />
            <text
              strokeWidth={0}
              dx={0}
              dy={0}
              fontFamily='"e8sDPRUS0jg1:::Open Sans"'
              fontSize={30}
              fontWeight={400}
              transform="rotate(90 244.879 368.31)"
            >
              <tspan y={0} />9
            </text>
            <rect
              width={28.673}
              height={53.488}
              fill="#d2dbed"
              strokeWidth={0}
              rx={0}
              ry={0}
              transform="matrix(1.4051 0 0 1 604.492 322.422)"
            />
            <rect
              width={28.673}
              height={53.488}
              fill="#d2dbed"
              strokeWidth={0}
              rx={0}
              ry={0}
              transform="matrix(1.4051 0 0 1 604.492 257.728)"
            />
            <rect
              width={28.673}
              height={53.488}
              fill="#d2dbed"
              strokeWidth={0}
              rx={0}
              ry={0}
              transform="matrix(1.4051 0 0 1 604.492 192.228)"
            />
          </g>
          <g transform="rotate(-90 792.556 387.041)">
            <rect
              width={117.995}
              height={126.132}
              fill="#e4e4e4"
              rx={2}
              ry={2}
              transform="matrix(.34144 0 0 2.30019 770.193 119.277)"
            />
            <text
              strokeWidth={0}
              dx={0}
              dy={0}
              fontFamily='"e8sDPRUS0jg1:::Open Sans"'
              fontSize={30}
              fontWeight={400}
              transform="rotate(90 328.906 450.183)"
            >
              <tspan y={0} />11
              <tspan x={0} y={60} />
            </text>
            <rect
              width={28.673}
              height={53.488}
              fill="#d2dbed"
              strokeWidth={0}
              rx={0}
              ry={0}
              transform="matrix(1.4051 0 0 1 770.492 322.422)"
            />
            <rect
              width={28.673}
              height={53.488}
              fill="#d2dbed"
              strokeWidth={0}
              rx={0}
              ry={0}
              transform="matrix(1.4051 0 0 1 770.492 257.728)"
            />
            <rect
              width={28.673}
              height={53.488}
              fill="#d2dbed"
              strokeWidth={0}
              rx={0}
              ry={0}
              transform="matrix(1.4051 0 0 1 770.492 192.228)"
            />
          </g>
          <text
            fill="#032492"
            strokeWidth={0}
            dx={0}
            dy={0}
            fontFamily='"e8sDPRUS0jg1:::Roboto"'
            fontSize={30}
            fontWeight={400}
            transform="translate(482.929 56.44)"
          >
            <tspan y={0} />Produits de beauté
            <tspan x={0} y={60} />
          </text>
          <rect
            width={682.012}
            height={560.962}
            fill="none"
            stroke="#032492"
            strokeWidth={2}
            paintOrder="stroke fill markers"
            rx={4}
            ry={4}
            transform="matrix(.54804 0 0 .6903 482.447 70.722)"
          />
        </g>
        <g transform="translate(37 53)">
          <rect
            width={682.012}
            height={560.962}
            fill="none"
            stroke="#00b5c2"
            strokeWidth={2}
            paintOrder="stroke fill markers"
            rx={4}
            ry={4}
            transform="matrix(.54804 0 0 .6903 482.447 70.722)"
          />
          <text
            fill="#00b5c2"
            strokeWidth={0}
            dx={0}
            dy={0}
            fontFamily='"e8sDPRUS0jg1:::Roboto"'
            fontSize={30}
            fontWeight={400}
            transform="translate(482.929 56.44)"
          >
            <tspan y={0} />Fromagerie
            <tspan x={0} y={60} />
          </text>
          <rect
            width={117.995}
            height={126.132}
            fill="#e4e4e4"
            rx={2}
            ry={2}
            transform="matrix(.34144 0 0 2.30019 770.193 119.277)"
          />
          <text
            strokeWidth={0}
            dx={0}
            dy={0}
            fontFamily='"e8sDPRUS0jg1:::Open Sans"'
            fontSize={30}
            fontWeight={400}
            transform="translate(781.54 151.646)"
          >
            <tspan y={0} />7
          </text>
          <rect
            width={28.673}
            height={53.488}
            fill="#d2dbed"
            strokeWidth={0}
            rx={0}
            ry={0}
            transform="matrix(1.4051 0 0 1 770.492 322.422)"
          />
          <rect
            width={28.673}
            height={53.488}
            fill="#d2dbed"
            strokeWidth={0}
            rx={0}
            ry={0}
            transform="matrix(1.4051 0 0 1 770.492 257.728)"
          />
          <rect
            width={28.673}
            height={53.488}
            fill="#d2dbed"
            strokeWidth={0}
            rx={0}
            ry={0}
            transform="matrix(1.4051 0 0 1 770.492 192.228)"
          />
          <rect
            width={117.995}
            height={126.132}
            fill="#e4e4e4"
            rx={2}
            ry={2}
            transform="matrix(.34144 0 0 2.30019 692.193 119.277)"
          />
          <text
            strokeWidth={0}
            dx={0}
            dy={0}
            fontFamily='"e8sDPRUS0jg1:::Open Sans"'
            fontSize={30}
            fontWeight={400}
            transform="translate(703.54 151.646)"
          >
            <tspan y={0} />6
          </text>
          <rect
            width={28.673}
            height={53.488}
            fill="#d2dbed"
            strokeWidth={0}
            rx={0}
            ry={0}
            transform="matrix(1.4051 0 0 1 692.492 322.422)"
          />
          <rect
            width={28.673}
            height={53.488}
            fill="#d2dbed"
            strokeWidth={0}
            rx={0}
            ry={0}
            transform="matrix(1.4051 0 0 1 692.492 257.728)"
          />
          <rect
            width={28.673}
            height={53.488}
            fill="#d2dbed"
            strokeWidth={0}
            rx={0}
            ry={0}
            transform="matrix(1.4051 0 0 1 692.492 192.228)"
          />
          <rect
            width={117.995}
            height={126.132}
            fill="#e4e4e4"
            rx={2}
            ry={2}
            transform="matrix(.34144 0 0 2.30019 604.193 119.277)"
          />
          <text
            strokeWidth={0}
            dx={0}
            dy={0}
            fontFamily='"e8sDPRUS0jg1:::Open Sans"'
            fontSize={30}
            fontWeight={400}
            transform="translate(615.54 151.646)"
          >
            <tspan y={0} />5
          </text>
          <rect
            width={28.673}
            height={53.488}
            fill="#d2dbed"
            strokeWidth={0}
            rx={0}
            ry={0}
            transform="matrix(1.4051 0 0 1 604.492 322.422)"
          />
          <rect
            width={28.673}
            height={53.488}
            fill="#d2dbed"
            strokeWidth={0}
            rx={0}
            ry={0}
            transform="matrix(1.4051 0 0 1 604.492 257.728)"
          />
          <rect
            width={28.673}
            height={53.488}
            fill="#d2dbed"
            strokeWidth={0}
            rx={0}
            ry={0}
            transform="matrix(1.4051 0 0 1 604.492 192.228)"
          />
          <rect
            width={117.995}
            height={126.132}
            fill="#e4e4e4"
            rx={2}
            ry={2}
            transform="matrix(.34144 0 0 2.30019 518.492 119.277)"
          />
          <text
            strokeWidth={0}
            dx={0}
            dy={0}
            fontFamily='"e8sDPRUS0jg1:::Open Sans"'
            fontSize={30}
            fontWeight={400}
            transform="translate(530.06 151.646)"
          >
            <tspan y={0} />4
          </text>
          <rect
            width={28.673}
            height={53.488}
            fill="#d2dbed"
            strokeWidth={0}
            rx={0}
            ry={0}
            transform="matrix(1.4051 0 0 1 518.492 192.228)"
          />
          <rect
            width={28.673}
            height={53.488}
            fill="#d2dbed"
            strokeWidth={0}
            rx={0}
            ry={0}
            transform="matrix(1.4051 0 0 1 518.492 257.728)"
          />
          <rect
            width={28.673}
            height={53.488}
            fill="#d2dbed"
            strokeWidth={0}
            rx={0}
            ry={0}
            transform="matrix(1.4051 0 0 1 518.492 322.422)"
          />
        </g>
        <g transform="translate(37 53)">
          <rect
            width={682.012}
            height={560.962}
            fill="none"
            stroke="#188f00"
            strokeWidth={2}
            paintOrder="stroke fill markers"
            rx={4}
            ry={4}
            transform="matrix(.54804 0 0 .6903 52.522 70.722)"
          />
          <rect
            width={117.995}
            height={126.132}
            fill="#e4e4e4"
            rx={2}
            ry={2}
            transform="matrix(.34144 0 0 2.30019 355.352 132.157)"
          />
          <text
            strokeWidth={0}
            dx={0}
            dy={0}
            fontFamily='"e8sDPRUS0jg1:::Open Sans"'
            fontSize={30}
            fontWeight={400}
            transform="translate(366.918 170.665)"
          >
            <tspan y={0} />3
          </text>
          <rect
            width={28.673}
            height={53.488}
            fill="#d2dbed"
            strokeWidth={0}
            rx={0}
            ry={0}
            transform="matrix(1.4051 0 0 1 355.352 198.728)"
          />
          <rect
            width={28.673}
            height={53.488}
            fill="#d2dbed"
            strokeWidth={0}
            rx={0}
            ry={0}
            transform="matrix(1.4051 0 0 1 355.352 260.728)"
          />
          <rect
            width={28.673}
            height={53.488}
            fill="#d2dbed"
            strokeWidth={0}
            rx={0}
            ry={0}
            transform="matrix(1.4051 0 0 1 355.352 323.728)"
          />
          <rect
            width={117.995}
            height={126.132}
            fill="#e4e4e4"
            rx={2}
            ry={2}
            transform="matrix(.34144 0 0 2.30019 287.352 132.157)"
          />
          <text
            strokeWidth={0}
            dx={0}
            dy={0}
            fontFamily='"e8sDPRUS0jg1:::Open Sans"'
            fontSize={30}
            fontWeight={400}
            transform="translate(298.918 169.963)"
          >
            <tspan y={0} />2
          </text>
          <rect
            width={28.673}
            height={53.488}
            fill="#d2dbed"
            strokeWidth={0}
            rx={0}
            ry={0}
            transform="matrix(1.4051 0 0 1 287.352 323.01)"
          />
          <rect
            width={28.673}
            height={53.488}
            fill="#d2dbed"
            strokeWidth={0}
            rx={0}
            ry={0}
            transform="matrix(1.4051 0 0 1 287.352 261.01)"
          />
          <rect
            width={28.673}
            height={53.488}
            fill="#d2dbed"
            strokeWidth={0}
            rx={0}
            ry={0}
            transform="matrix(1.4051 0 0 1 287.352 200.01)"
          />
          <g>
            <rect
              width={117.995}
              height={126.132}
              fill="#e4e4e4"
              rx={2}
              ry={2}
              transform="rotate(135 54.085 226.273)scale(.34144 1.674)"
            />
            <text
              strokeWidth={0}
              dx={0}
              dy={0}
              fontFamily='"e8sDPRUS0jg1:::Open Sans"'
              fontSize={30}
              fontWeight={400}
              transform="translate(94.45 238.796)"
            >
              <tspan y={0} />1
            </text>
            <rect
              width={28.673}
              height={53.488}
              fill="#d2dbed"
              strokeWidth={0}
              rx={0}
              ry={0}
              transform="rotate(135 32.22 173.487)scale(1.40509 1)"
            />
            <rect
              width={28.673}
              height={53.488}
              fill="#d2dbed"
              strokeWidth={0}
              rx={0}
              ry={0}
              transform="rotate(135 47.422 210.42)scale(1.40509 1)"
            />
          </g>
          <text
            fill="#188f00"
            strokeWidth={0}
            dx={0}
            dy={0}
            fontFamily='"e8sDPRUS0jg1:::Roboto"'
            fontSize={30}
            fontWeight={400}
            transform="translate(49.518 56.037)"
          >
            <tspan y={0} />Boucherie
          </text>
        </g>
      </svg>
      {showModal && (
        <div
          className="modal"
          style={{ left: modalPosition.x, top: modalPosition.y }}
        >
          <h4>Produit</h4>
          <p>Stock: {stockInfo}</p>
          <span className="close-button" onClick={closeModal}>
            &times;
          </span>
          <a href="exemple">Faire</a>
        </div>
      )}
    </>
  );
};

export default SvgMap;
