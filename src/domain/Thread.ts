export interface ThreadRender<A> {
    node: A;
    subNodes: ThreadRender<A>[];
}
