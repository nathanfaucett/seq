var Iterator = require("iterator"),
    defineProperty = require("define_property"),
    isNullOrUndefined = require("is_null_or_undefined"),
    ITERATOR_SYMBOL = require("./ITERATOR_SYMBOL"),
    fromValue, EMPTY_SEQ, ArraySeq, ObjectSeq;


var IS_SEQ = "__SEQ__",
    SeqPrototype;


module.exports = Seq;


fromValue = require("./fromValue");
ArraySeq = require("./ArraySeq");
ObjectSeq = require("./ObjectSeq");
EMPTY_SEQ = require("./EMPTY_SEQ");


function Seq(value) {
    return (
        isNullOrUndefined(value) ? EMPTY_SEQ :
        fromValue(value)
    );
}
SeqPrototype = Seq.prototype;

function isSeq(value) {
    return !!(value && value[IS_SEQ]);
}
Seq.isSeq = isSeq;

Seq.Indexed = require("./IndexedSeq");
Seq.Keyed = require("./IndexedSeq");

defineProperty(SeqPrototype, IS_SEQ, {
    configurable: false,
    enumerable: false,
    writable: false,
    value: true
});

Seq.of = function() {
    return new Seq(arguments);
};

SeqPrototype.toSeq = function() {
    return this;
};

SeqPrototype.size = function() {
    return 0;
};

if (defineProperty.hasGettersSetters) {
    defineProperty(SeqPrototype, "length", {
        get: SeqPrototype.size
    });
}

SeqPrototype.iterate = function(fn, reverse) {
    return this.__iterate(fn, reverse);
};

SeqPrototype.iterator = function(reverse) {
    return this.__iterator(Iterator.VALUES, reverse);
};

SeqPrototype[ITERATOR_SYMBOL] = SeqPrototype.iterator;