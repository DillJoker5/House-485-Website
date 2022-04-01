import naturalCompare from 'natural-compare';

const TABLE_HEADERS = [
    'location',
    'price',
    'address',
    'description',
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
                return (
                    naturalCompare(a.location.toLowerCase(), b.location.toLowerCase()) ||
                    naturalCompare(a.star, b.star) ||
                    naturalCompare(a.price, b.price)
                );

            case TABLE_HEADERS[1]:
                return (
                    naturalCompare(a.price, b.price) ||
                    naturalCompare(a.star, b.star) ||
                    naturalCompare(a.address.toLowerCase(), b.address.toLowerCase())
                );

            case TABLE_HEADERS[2]:
                return (
                    naturalCompare(a.address.toLowerCase(), b.address.toLowerCase()) ||
                    naturalCompare(a.star, b.star) ||
                    naturalCompare(a.price, b.price)
                );

            case TABLE_HEADERS[3]:
                naturalCompare(a.description[0].toLowerCase(), b.description[0].toLowerCase()) ||
                naturalCompare(a.star, b.star) ||
                naturalCompare(a.price, b.price)
                break;

            case TABLE_HEADERS[4]:
                naturalCompare(a.star, b.star) ||
                naturalCompare(a.address.toLowerCase(), b.address.toLowerCase()) ||
                naturalCompare(a.price, b.price)
                break;

            default:
                break;
        }
    });

    return sortedHouses;
}

export default sortHouseTable;
