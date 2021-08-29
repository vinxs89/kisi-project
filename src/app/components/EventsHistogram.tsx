import { Box, Chip } from "@material-ui/core"
import { useStyles } from "../Styles";
import { Event } from "../Types";

type EventsLogProps = {
  events: Event[];
  bars: number;
}

type HistogramItem = {
  events: Event[];
  success: number;
  failure: number;
}

type HistogramInfo = {
  items: HistogramItem[];
  yLegend: number[],
  xLegend: number[],
  maxValue: number;
}

export const EventsHistogram = ({ events, bars }: EventsLogProps) => {
  const classes = useStyles();
    
  //events = mockSomeEvents(events, 120);
  const histogramInfo = buildHistogramData(events, bars);

  return (
    <Box className={classes.histogram}>
      <Box className={classes.histogram__top}>
        <Box className={classes.histogram__legendY}>
          { 
            histogramInfo.yLegend.map(y => (
              <p key={y} style={{margin: 0}}>{y}</p>
            ))
          }
        </Box>
        {
          histogramInfo.items.map((bar, index) => (
            <Box key={index} className={classes.histogram__barWrapper}>
              {
                bar.success > 0 && <Box style={{border: '1px solid #a7c7f9', backgroundColor: '#d2e3fc', borderTopLeftRadius: '5px', borderTopRightRadius: '5px'}} margin="1px 2px" height={calculateHeight(bar.success, histogramInfo.maxValue)}></Box>
              }
              {
                bar.failure > 0 && <Box style={{border: '1px solid #c96c6d', backgroundColor: '#d93124', borderTopLeftRadius: bar.success === 0 ? '5px' : 0, borderTopRightRadius: bar.success === 0 ? '5px' : 0}} margin="1px 2px" height={calculateHeight(bar.failure, histogramInfo.maxValue)}></Box>
              }
            </Box>
          ))
        }
      </Box>
      <Box className={classes.histogram__bottom}>
        {
          histogramInfo.xLegend.map(timestamp => (
            <Chip className={classes.histogram__dateChip} key={timestamp} label={new Date(timestamp).toLocaleDateString()} variant="outlined" />
          ))
        }
      </Box>
    </Box>
  )
}

const getRandomInt = (min: number, max: number): number => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const buildHistogramData = (events: Event[], bars: number): HistogramInfo => {
  const firstTimestamp = new Date(events[events.length - 1].createdAt).getTime();
  const lastTimestamp = new Date().getTime();

  const totalTime = lastTimestamp - firstTimestamp;
  const slotLength = totalTime / bars;

  const histogramData: HistogramItem[] = [];
  for(let i=0; i<bars; i++) {
    histogramData[i] = { events: [], success: 0, failure: 0};
  }

  let currentSlot = bars - 1;
  let currentSlotLimit = lastTimestamp - slotLength;
  for (let event of events) {
    const timestamp = new Date(event.createdAt).getTime();
    if (currentSlot > 0) {
      if(timestamp >= currentSlotLimit) {
        histogramData[currentSlot].events.push(event);
      } else {
        while(currentSlot > 0 && timestamp < currentSlotLimit) {
          currentSlot--;
          currentSlotLimit -= slotLength;
        }
        histogramData[currentSlot].events.push(event);
      }
    } else {
      histogramData[currentSlot].events.push(event);
    }
  }

  let maxValue = 0;
  for (let histogramItem of histogramData) {
    const count = histogramItem.events.length;

    //const success = histogramItem.events.filter(e => e.success).length;
    const success = getRandomInt(0, count);
    const failure = count - success;

    maxValue = Math.max(maxValue, count);
    histogramItem.success = success;
    histogramItem.failure = failure;
  }

  return {
    items: histogramData,
    yLegend: [...new Set(distributeElements(0, maxValue, 4))].reverse(),
    xLegend: distributeElements(firstTimestamp, lastTimestamp, 2),
    maxValue
  };
}

const distributeElements = (min: number, max: number, n: number) => {
  const elements = [min];
  const totalItems = max - min;
  const interval = Math.floor(totalItems/(n - 1));
  for (var i = 1; i < n - 1; i++) {
      elements.push(min + (i * interval));
  }
  elements.push(max);
  return elements;
}

const calculateHeight = (value: number, max: number) => {
  if (max === 0) {
    return 0;
  }
  return (value * 100 / max) + 'px';
}

const mockSomeEvents = (events: Event[], repetition: number) => {
  const firstTimestamp = new Date(events[events.length - 1].createdAt).getTime();
  const lastTimestamp = new Date().getTime();

  const tempEvents: Event[] = [];
  for(let i=0; i<repetition; i++) {
    for(let e of events) {
      tempEvents.push({...e});
    }
  }

  for(let i=0; i<tempEvents.length; i++) {
    tempEvents[i].createdAt = new Date(getRandomInt(firstTimestamp, lastTimestamp)).toString();
  }

  tempEvents.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  return tempEvents;
}
