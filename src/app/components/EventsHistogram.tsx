import { Box } from "@material-ui/core"
import { Event } from "../Types";

type EventsLogProps = {
  events: Event[] | null | 'Loading';
}

type HistogramItem = {
  events: Event[];
  success: number;
  failure: number;
}

type HistogramInfo = {
  items: HistogramItem[];
  maxValue: number;
}

const getRandomInt = (min: number, max: number): number => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const buildHistogramData = (events: Event[], bars: number): HistogramInfo => {
  const firstTimestamp = new Date(events[events.length - 1].createdAt).getTime();
  const lastTimestamp = new Date().getTime();
  
  for(let i=1; i<events.length - 2; i++) {
    events[i].createdAt = new Date(getRandomInt(firstTimestamp, lastTimestamp)).toString();
  }
  events.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

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
    maxValue
  };
}

const calculateHeight = (value: number, max: number) => {
  if (max === 0) {
    return 0;
  }
  return (value * 100 / max) + 'px';
}

export const EventsHistogram = ({ events }: EventsLogProps) => {

  if(events !== null && events !== 'Loading') {

    const bars = 35;
    const repetition = 22;

    const tempEvents: Event[] = [];
    for(let i=0; i<repetition; i++) {
      for(let e of events) {
        tempEvents.push({...e});
      }
    }

    const histogramInfo = buildHistogramData(tempEvents, bars);

    return (
      <Box display="flex" height="150px" padding="10px" border="1px solid #ccc">
        <Box display="flex" flexDirection="column" marginTop="auto" marginRight="20px" height="100%" justifyContent="space-between">
          <p style={{margin: 0}}>75</p>
          <p style={{margin: 0}}>50</p>
          <p style={{margin: 0}}>25</p>
          <p style={{margin: 0}}>0</p>
        </Box>
        {
          histogramInfo.items.map((bar, index) => (
            <Box key={index} display="flex" flexDirection="column" marginTop="auto" width="100%">
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
    )
  }

  return <p>Histogram</p>;
}