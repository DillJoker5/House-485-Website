import naturalCompare from 'natural-compare';

const TABLE_HEADERS = [
    'location',
    'price',
    'address',
    'distance',
    'star',
];

const swap = (a, b) => {
    let temp = a;
    a = b;
    b=temp;
}

const sortHouseTable = ({
    houses,
    reverse,
    sortColumn
}) => {
    let sortedHouses = houses.sort((a, b) => {
        if(reverse) {
            swap(a,b);
        }

        switch(sortColumn) {
            case TABLE_HEADERS[0]:
                break;

            case TABLE_HEADERS[1]:
                break;

            case TABLE_HEADERS[2]:
                break;

            case TABLE_HEADERS[3]:
                break;

            case TABLE_HEADERS[4]:
                break;

            default:
                break;
        }
    });

    return sortedHouses;
}

export default sortHouseTable;
